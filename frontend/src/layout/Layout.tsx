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
    title: string,
    children: React.ReactNode
}
const Layout = ({ title, children }: LayoutProps) => {
    return (
        <div className='flex flex-col gap-2 pt-10 pb-10 bg-yellow-400'>
            <Title className='pl-5 text-white'>{title}</Title>
            <div className='flex flex-col gap-4 w-full h-screen    px-4 pt-8 pb-25 bg-zinc-100 rounded-t-2xl text-gray-800'>
                {children}
                <div className='fixed left-0 bottom-0  flex flex-row justify-between items-center w-full px-5 py-1 bg-white'>

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
                    <div>
                        <div className='absolute left-1/2 -translate-x-1/2  bottom-8 flex flex-row justify-center items-center w-15 h-15 bg-gray-100 rounded-full '>
                            <NavLink to='/records/new' className='flex flex-row justify-center items-center w-10 h-10 pb-1 bg-yellow-500 rounded-full text-2xl font-bold'>+</NavLink>
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
            </div>
        </div >
    )
}

export default Layout