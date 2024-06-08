'use client'
import Layout from '/src/components/admin/Layout'
import { useSession } from 'next-auth/react';

export default function page() {
    const {data : session} = useSession();

    if(session === null){
        return  (
            <h1>Wait bro</h1>
        )
    }
    return (
        <Layout>
            <div className='text-blue-900 flex justify-between overflow-hidden'>
                <h2>Hello, {session?.user?.name}</h2>
                <div className='flex bg-gray-300 gap-1 text-black rounded-lg'>
                    <img src={session?.user?.image} alt="" className='w-6 h-6'/>
                    <span className='px-2'>{session?.user?.name}</span>
                </div>
            </div>
        </Layout>
    )
}
