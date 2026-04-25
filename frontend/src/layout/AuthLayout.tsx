import React from 'react'

type AuthLayoutProps = {
    children: React.ReactNode
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="flex flex-col justify-end items-center w-full min-h-screen bg-white flex justify-center">
            <div className=" max-w-md flex flex-col justify-center gap-6 w-full flex-2 px-4 pt-20 pb-15">
                {children}
            </div>
            <div className="w-full  min-h-[120px] flex-1 bg-yellow-400">
            </div>
        </div>
    )
}

export default AuthLayout