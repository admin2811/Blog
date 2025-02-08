'use client'
import { assets, blog_data } from '@/Assets/assets'
import Footer from '@/Components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import "@cyntler/react-doc-viewer/dist/index.css"
import createReport from 'docx-templates'
import * as docx from 'docx-preview'

const page = ({params}) => {
  const [data, setData] = useState(null)
  const [fileUrl, setFileUrl] = useState(null)
  const fetchBlogData = async () => {
      const response = await axios.get('/api/blog', {
        params:{
          id:params.id
        }
      })
      setData(response.data);
      if (response.data.file) {
        setFileUrl(`${response.data.file}`)
      }
      console.log(response.data)
  }
  useEffect(() => {
    fetchBlogData()
  },[])

  useEffect(() => {
    if (fileUrl) {
      fetch(fileUrl)
        .then(res => res.arrayBuffer())
        .then(template => {
          createReport({
            template,
            data: { name: 'John', surname: 'Appleseed' },
          }).then(buffer => {
            docx.renderAsync(buffer, document.getElementById('container'))
              .then(() => console.log('docx: finished'));
          });
        })
        .catch(error => console.error('Lỗi khi tải file DOCX:', error));
    }
  }, [fileUrl])
  
  return ( data ? <>
    <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
      <div className='flex justify-between items-center'>
      <Link href='/'>
        <Image src={assets.logo} width={180} alt='' className='w-[130px] sm:w-auto'/>
      </Link>
        <Link href='/admin/addProduct' className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-custom-black'>
          Get started <Image src={assets.arrow} width={12} alt='' />
        </Link>
      </div>
      <div className='text-center my-24'>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
        <Image className='mx-auto mt-6 border border-white rounded-full' src={assets.profile_icon} width={60} height={60} alt=''/>
        <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
      </div>
    </div>
    <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
      <Image className='border-4 border-white' src={data.image} width={1280} height={720} alt='' />
      <div className='blog-content' dangerouslySetInnerHTML={{__html:data.description}}>
      </div>
      <div id="container" style={{ height: "600px", overflowY: "auto" }} />
      <div className='my-24'>
        <p className='text-black font font-semibold my-4'>Share this article on social media</p>
        <div className='flex'>
          <Image src={assets.facebook_icon} alt='' width={50} />
          <Image src={assets.twitter_icon} alt='' width={50} />
          <Image src={assets.googleplus_icon} alt='' width={50} />
        </div>
      </div>
    </div>
    <Footer/>
    </> : <> </>
  )
}

export default page