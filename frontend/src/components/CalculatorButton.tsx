import React from 'react'

type CalculatorButtonProps = {
    onClick?: () => void,
    className?: string,
    children: React.ReactNode
}
const CalculatorButton = ({ onClick, className, children }: CalculatorButtonProps) => {
    return (
        <div onClick={onClick} className={`flex flex-row justify-center items-center  px-2  py-2 border border-gray-200 rounded-lg bg-white text-center text-sm font-medium cursor-pointer ${className}`}>
            {children}
        </div>
    )
}

export default CalculatorButton