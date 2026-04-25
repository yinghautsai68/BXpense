import React from 'react'
import { Title } from '../components/Typography'
import { NavLink } from 'react-router-dom'

import IconHome from '../assets/icons/icon-home-pulsar.png'
import IconHomeYellow from '../assets/icons/icon-home-yellow-pulsar.png'
import IconReport from '../assets/icons/icon-report-pulsar.png'
import IconReportYellow from '../assets/icons/icon-report-yellow-pulsar.png'
import IconWallet from '../assets/icons/icon-wallet-pulsar.png'
import IconWalletYellow from '../assets/icons/icon-wallet-yellow-pulsar.png'
import IconProfile from '../assets/icons/icon-profile-pulsar.png'
import IconProfileYellow from '../assets/icons/icon-profile-yellow-pulsar.png'
import LayoutNavigation from '../components/LayoutNavigation'
type LayoutProps = {
    title?: string,
    component?: React.ReactNode,
    children: React.ReactNode
}
const Layout = ({ title, component, children }: LayoutProps) => {
    return (
        <div className='flex flex-col items-center w-full min-h-screen md:px-2 pt-10  md:pt-25 bg-yellow-500'>

            <div className='relative flex flex-row justify-center items-center items-stretch w-full max-w-2xl min-h-screen  pt-5  md:p-5 md:pb-0 md:bg-yellow-800 rounded-t-3xl '>
                <div className='absolute top-0 -translate-y-1/2 hidden md:flex flex-row  gap-5 w-full max-w-2xl px-10'>

                    {Array.from({ length: 15 }).map((_, index) => (
                        <div key={index} className="w-15 h-25 bg-gray-500 rounded-xl"></div>
                    ))}

                </div>
                <div className='flex flex-col w-full min-h-screen  md:pt-15 md:bg-zinc-100 '>
                    <div className='w-full'>
                        {
                            title && <Title className='pl-5 text-white md:text-black'>{title}</Title>
                        }
                        {
                            component && component
                        }
                    </div>
                    <div className='flex flex-col gap-4 w-full min-h-screen   px-4 pt-8 pb-25 bg-zinc-100 rounded-t-2xl md:rounded-none text-gray-800'>
                        {children}
                    </div>
                </div>
                <div className=' fixed left-1/2 -translate-x-1/2 bottom-0 md:bottom-5  flex flex-row justify-between items-center w-full md:w-lg px-5 py-1 md:border bg-white  md:rounded-xl overflow-hidden'>
                    <NavLink to='/records'>
                        {({ isActive }) => (
                            <LayoutNavigation
                                isActive={isActive}
                                icon={IconHome}
                                activeIcon={IconHomeYellow}
                                label='首頁'
                            />
                        )}
                    </NavLink>
                    <NavLink to='/analysis'>
                        {
                            ({ isActive }) => (
                                <LayoutNavigation
                                    isActive={isActive}
                                    icon={IconReport}
                                    activeIcon={IconReportYellow}
                                    label='報表' />
                            )
                        }
                    </NavLink>
                    <div className=' '>
                        <div className='absolute left-1/2 -translate-x-1/2  bottom-8 flex flex-row justify-center items-center w-15 h-15 bg-gray-100 rounded-full '>
                        </div>
                    </div>
                    <NavLink to='/accounts'>
                        {
                            ({ isActive }) => (
                                <LayoutNavigation
                                    isActive={isActive}
                                    icon={IconWallet}
                                    activeIcon={IconWalletYellow}
                                    label='賬戶'
                                />
                            )
                        }
                    </NavLink>
                    <NavLink to='/profile'>
                        {
                            ({ isActive }) => (
                                <LayoutNavigation
                                    isActive={isActive}
                                    icon={IconProfile}
                                    activeIcon={IconProfileYellow}
                                    label='我的'
                                />
                            )
                        }
                    </NavLink>
                </div>
                <NavLink to='/records/new' className=' fixed left-1/2 -translate-x-1/2 bottom-10 md:bottom-15 flex flex-row justify-center items-center w-10 h-10 pb-1 bg-yellow-500 rounded-full text-2xl font-bold '>+</NavLink>
            </div >
        </div>
    )
}

export default Layout