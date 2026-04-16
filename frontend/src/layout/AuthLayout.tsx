import React from 'react'

type AuthLayoutProps = {
    children: React.ReactNode
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-white flex justify-center">
            <div className="w-full max-w-md flex flex-col gap-6 px-4 pt-8 pb-15">
                {children}
            </div>
            <div className="w-full  h-[100px] bg-yellow-400">
            </div>
        </div>
    )
}

export default AuthLayout