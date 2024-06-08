import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';

export default function ForbidenAccess() {
  const router = useRouter();
  
  useEffect(()=>{
    setTimeout(()=>{
        router.push('/')
    },5000)
  },[])

  return (
    <div className='flex flex-col justify-center items-center w-screen h-screen gap-5 '>
      <h1 className='font-bold text-[#004f4f] text-9xl'>403</h1>
      <h5 className='font-semibold text-[#004f4f] text-7xl'>Forbidden</h5>
      <p className='font-medium text-[#004f4f] text-5xl'>Access to this resource on the server is denied!</p>
    </div>
  )
}
