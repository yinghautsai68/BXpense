import React from 'react'

type CardProps = {
    className?: string
    children: React.ReactNode
}
const Card = ({ className, children }: CardProps) => {
    return (
        <div className={`${className} p-4 bg-white rounded-xl`}>
            {children}
        </div>
    )
}

export default Card