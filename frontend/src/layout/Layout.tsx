import React from 'react'
import { Title } from '../components/Typography'

type LayoutProps = {
    children: React.ReactNode
}
const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='flex flex-col gap-2 pt-10 bg-yellow-400'>
            <Title className='pl-5 text-white'>記帳</Title>
            <div className='flex flex-col gap-2 w-full min-h-screen    px-4 pt-8 pb-25 bg-zinc-100 rounded-t-2xl text-gray-800'>
                {children}
                <div className='fixed left-0 bottom-0  flex flex-row justify-between items-center w-full px-5 py-5 bg-white'>
                    <span>home</span>
                    <span>home</span>
                    <div className='p-2 border rounded-xl'>home</div>
                    <span>home</span>
                    <span>home</span>
                </div>
            </div>
        </div>
    )
}

export default Layout