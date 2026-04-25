import React from 'react'
import { SubTitle } from '../components/Typography';
import { useNavigate } from 'react-router-dom';

type DetailLayoutProps = {
    title: string,
    rightAction?: React.ReactNode,
    children: React.ReactNode
};
const DetailLayout = ({ title, rightAction, children }: DetailLayoutProps) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center gap-4 w-full min-h-screen md:p-5 bg-yellow-400  overflow-hidden">
            <div className='flex flex-col gap-3 w-full flex-1 max-w-md md:h-150 px-5 py-10 bg-gray-100 md:rounded-xl shadow-xl/20 '>
                <div className="grid grid-cols-[1fr_auto_1fr] w-full h-10  px-3">
                    <p onClick={() => navigate(-1)} className=" font-bold cursor-pointer">x</p>
                    <SubTitle className="flex-1 text-center">{title}</SubTitle>
                    <div className="flex flex-row justify-end items-center">
                        {rightAction ? rightAction : null}
                    </div>
                </div>
                <div className='flex flex-col gap-2 w-full flex-1 min-h-0 '>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DetailLayout