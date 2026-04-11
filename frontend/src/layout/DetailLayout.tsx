import React from 'react'
import { Title } from '../components/Typography';

type DetailLayoutProps = {
    title: string,
    children: React.ReactNode
};
const DetailLayout = ({ title, children }: DetailLayoutProps) => {
    return (
        <div className="flex flex-col gap-4 w-full h-screen px-3 pt-3 bg-gray-200">
            <div className="flex flex-row justify-between items-center">
                <p className="w-full">previous</p>
                <Title className="w-full text-center">{title}</Title>
                <div className="w-full"></div>
            </div>
            {children}
        </div>
    )
}

export default DetailLayout