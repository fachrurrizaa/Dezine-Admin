'use client'
import Button from '@/components/Button';
import Input from '@/components/Input'
import { signIn } from "next-auth/react"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()

  async function handleSubmit(){
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false
    })
    if(res.ok){
      router.push("/dashboard")
    }
    if(res.error){
      setError(true)
      setErrorMessage(res.error)
    }
  }

  return (
    <div className='flex justify-center items-center flex-col w-80'>
        <h1 className="text-3xl font-bold mb-8">Hello, Captain!</h1>
          <Input type={"email"} label={"Email Address"} placeholder={"Type your email"} onChange={(e) => setData({...data, email: e.target.value})}/>
          <Input type={"password"} label={"Password"} placeholder={"Type your password"} onChange={(e) => setData({...data, password: e.target.value})}/>
          <p className={`text-red-500 ${error ? "block" : "hidden"}`}>{`*${errorMessage}`}</p>
          <Button type={"submit"} className={'w-full text-white bg-[#028d94] hover:bg-[#02b2bb] mt-8 font-semibold'} content={"Sign In"} click={()=>handleSubmit(data)}/>
    </div>
  )
}
