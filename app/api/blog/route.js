import { ConnectDB } from "@/app/lib/config/db"
import BlogModel from "@/app/lib/models/BlogModel"

const { NextResponse } = require("next/server")
import { writeFile } from 'fs/promises'
const fs = require("fs")
const LoadDB = async () => {
    await ConnectDB()
}

LoadDB();

export async function GET(request) {
    const blogId = request.nextUrl.searchParams.get("id");
    if(blogId) {
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json(blog);
    }else{
        const blogs = await BlogModel.find({});
        return NextResponse.json({blogs})
    }
}

export async function POST(request){
    const formData = await request.formData()
    const timestamp = Date.now();

    // Xử lý ảnh upload
    const image = formData.get('image');
    let imgUrl = null;
    if (image) {
        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData)
        const imagePath = `./public/uploads/${timestamp}_${image.name}`;
        await writeFile(imagePath, buffer)
        imgUrl = `/uploads/${timestamp}_${image.name}`;
    }

    // Xử lý file tài liệu (PDF, DOC, DOCX,...)
    const file = formData.get('file');
    let fileUrl = null;
    if (file) {
        const fileByteData = await file.arrayBuffer();
        const buffer = Buffer.from(fileByteData)
        const filePath = `./public/uploads/${timestamp}_${file.name}`;
        await writeFile(filePath, buffer)
        fileUrl = `/uploads/${timestamp}_${file.name}`;
    }

    const blogData = {
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('category'),
        author: formData.get('author'),
        image: imgUrl,
        file: fileUrl, // Lưu đường dẫn file tài liệu
        authorImg: formData.get('authorImg')
    }
    
    await BlogModel.create(blogData);
    console.log("Blog Saved")
    return NextResponse.json({success:true, msg:"Blog Added"})
}

export async function DELETE(request){
    const id = await request.nextUrl.searchParams.get("id");
    const blog = await BlogModel.findById(id);
    
    if (blog.image) {
        fs.unlink(`./public${blog.image}`, () => {
            console.log("Image Deleted")
        });
    }
    
    if (blog.file) {
        fs.unlink(`./public${blog.file}`, () => {
            console.log("File Deleted")
        });
    }
    
    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({success:true, msg:"Blog Deleted"})    
}
