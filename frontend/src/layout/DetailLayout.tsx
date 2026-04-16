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
        <div className="flex flex-col gap-4 w-full min-h-screen px-3 pt-3 pb-5 bg-gray-100">
            <div className="flex flex-row justify-between items-center px-3">
                <p onClick={() => navigate(-1)} className="w-full font-bold">x</p>
                <SubTitle className="w-full text-center">{title}</SubTitle>
                <div className="flex flex-row justify-end items-center w-full">
                    {rightAction ? rightAction : null}
                </div>
            </div>
            {children}
        </div>
    )
}

export default DetailLayout