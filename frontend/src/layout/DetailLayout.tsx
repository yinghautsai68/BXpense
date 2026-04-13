import React from 'react'
import { SubTitle } from '../components/Typography';
import { useNavigate } from 'react-router-dom';

type DetailLayoutProps = {
    title: string,
    children: React.ReactNode
};
const DetailLayout = ({ title, children }: DetailLayoutProps) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-4 w-full min-h-screen px-3 pt-3 pb-5 bg-gray-200">
            <div className="flex flex-row justify-between items-center px-3">
                <p onClick={() => navigate(-1)} className="w-full font-bold">x</p>
                <SubTitle className="w-full text-center">{title}</SubTitle>
                <div className="w-full"></div>
            </div>
            {children}
        </div>
    )
}

export default DetailLayout