import React from 'react'
import { Title } from '../components/Typography'
import { NavLink } from 'react-router-dom'

type LayoutProps = {
    children: React.ReactNode
}
const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='flex flex-col gap-2 pt-10 pb-10 bg-yellow-400'>
            <Title className='pl-5 text-white'>記帳</Title>
            <div className='flex flex-col gap-4 w-full min-h-screen    px-4 pt-8 pb-25 bg-zinc-100 rounded-t-2xl text-gray-800'>
                {children}
                <div className='fixed left-0 bottom-0  flex flex-row justify-between items-center w-full px-5 py-5 bg-white'>
                    <NavLink to='/records'>紀錄</NavLink>
                    <NavLink to='/analysis'>分析</NavLink>
                    <NavLink to='/record' className='p-4 border'>+</NavLink>
                    <NavLink to='/savings'>存錢</NavLink>
                    <NavLink to='/profile'>我的</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Layout