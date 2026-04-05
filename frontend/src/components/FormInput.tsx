import React from 'react'

type FormInputProps = {
    className?: string,
    label: string,
    name: string,
    value: string,
    type: string,
    placeholder: string
}
const FormInput = ({ className, label, name, value, type, placeholder }: FormInputProps) => {
    return (
        <div className='flex flex-col w-full'>
            <label htmlFor={name} className='font-bold'>{label}</label>
            <input id={name} name={name} value={value} type={type} placeholder={placeholder} className='px-2 py-1 border rounded-lg' />
        </div>
    )
}

export default FormInput