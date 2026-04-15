import React from 'react'

type CardProps = {
    className?: string
    children: React.ReactNode
}
const Card = ({ className, children }: CardProps) => {
    return (
        <div className={` p-4 rounded-xl ${className}`}>
            {children}
        </div>
    )
}

export default Card