import React from 'react'

type InformationProps = {
    className?: string,
    label: string,
    value: string | undefined
}
const Information = ({ className, label, value }: InformationProps) => {
    return (
        <div className={`${className} flex flex-row justify-between w-full`}>
            <span>{label}</span>
            <span>{value}</span>
        </div>
    )
}

export default Information