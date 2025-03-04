import { assets } from '@/Assets/assets'
import React, { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { toast } from 'react-toastify'
import { set } from 'mongoose'
const Header = () => {
  const [email, setEmail] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post('/api/email', formData);
    if(response.data.success) {
      toast.success(response.data.msg)
      setEmail('')
    }else{
      toast.error("Error")
    }
  }
  return (
    <div className = "py-5 px-5 md:px-12 lg:px-28">
       <div className='flex justify-between items-center'>
         <Image src={assets.logo} width={180} alt='' className='w-[130px] sm:w-auto'/>
         <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-custom-black'>Get Started <Image src={assets.arrow} alt="Arrow icon" /></button>       
       </div>
       <div className='text-center my-8'>
        <h1 className='font-medium text-3xl sm:text-5xl'>Minh Blogs</h1>
        <p className='mt-10 max-w-[740px] mx-auto text-xs sm:text-base'>Tôi là Nguyễn Đức Minh là sinh viên năm cuối của Trường Đại học Thuỷ Lợi , Khoa Công Nghệ Thông tin và hiện tại tôi cũng đang là một lập trình viên FullStack Developer. Hãy theo dõi các thông tin blog của mình nhé.</p>
        <form onSubmit={onSubmitHandler} className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-custom-black' action="">
            <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' placeholder="Enter your Email" className='pl-4 outline-none'/>
            <button type='submit' className='border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white'>Subscribe</button>
        </form>
       </div>
    </div>
  )
}

export default Header