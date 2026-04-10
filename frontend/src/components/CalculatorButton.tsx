import React from 'react'

type CalculatorButtonProps = {
    onClick?: () => void,
    className?: string,
    children: React.ReactNode
}
const CalculatorButton = ({ onClick, className, children }: CalculatorButtonProps) => {
    return (
        <div onClick={onClick} className={`${className} flex flex-row justify-center items-center  px-2  py-2 bg-white rounded-lg text-center text-sm cursor-pointer`}>
            {children}
        </div>
    )
}

export default CalculatorButton