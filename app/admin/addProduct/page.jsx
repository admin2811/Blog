'use client'
import { assets } from '@/Assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, {useState} from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const page = () => {
    const [image, setImage] = useState(false)
    const [file, setFile] = useState(null)
    const [data, setData] = useState({
        title: "",
        description: "",
        category: "Startup",
        author: "Duc Minh",
        authorImg: "/author_img.png",
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name]: value}))
        console.log(data);
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault(); 
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('author', data.author);
        formData.append('authorImg', data.authorImg);
        formData.append('image', image);
        if (file) {
            formData.append('file', file);
        }
        
        const response = await axios.post('/api/blog', formData);
        if(response.data.success) {
            toast.success(response.data.msg);  
            setImage(false)
            setFile(null)
            setData({
                title: "",
                description: "",
                category: "Startup",
                author: "Duc Minh",
                authorImg: "/author_img.png",
            })
        } else {
            toast.error('Blog failed to be added');
        }
    }
  
    return (
        <>
            <form className='pt-5 px-5 sm:pt-12 sm:pl-16' onSubmit={onSubmitHandler}>
                <p className='text-xl'>Upload thumbnail</p>
                <label htmlFor="image">
                    <Image className='mt-4' src={!image ? assets.upload_area : URL.createObjectURL(image)} width={140} height={70} alt=''/>
                </label>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required/>
                
                <p className='text-xl mt-4'>Upload file (PDF, DOC, etc.)</p>
                <input onChange={(e) => setFile(e.target.files[0])} type="file" className='w-full sm:w-[500px] mt-4 px-4 py-3 border' accept=".pdf,.doc,.docx" required/>
                
                <p className='text-xl mt-4'>Blog title</p>
                <input name='title' onChange={onChangeHandler} value={data.title} className="w-full sm:w-[500px] mt-4 px-4 py-3 border" type="text" placeholder="Type here" required/>
                
                <p className='text-xl mt-4'>Description</p>
                <textarea name='description' onChange={onChangeHandler} value={data.description} className="w-full sm:w-[500px] mt-4 px-4 py-3 border" type="text" placeholder="write content here" rows={6} required/>
                
                <p className='text-xl mt-4'>Blog category</p>
                <select name='category' onChange={onChangeHandler} value={data.category} className="w-40 mt-4 px-4 py-3 border text-gray-500" required>
                    <option value="Startup">Startup</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Project">Project</option>
                </select>
                
                <br />
                <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">ADD</button>
            </form>
        </>
    )
}

export default page