import React from 'react'

type FormInputProps = {
    className?: string,
    label: string,
    name: string,
    value?: string,
    type: string,
    required: boolean,
    placeholder?: string,

    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(({ className, label, name, value, type, placeholder, required, onChange }, ref) => {
    return (
        <div className='flex flex-col w-full'>
            <label htmlFor={name} className='font-bold'>{label}</label>
            <input ref={ref} onChange={onChange} id={name} name={name} value={value} type={type} placeholder={placeholder} required={required} className='px-2 py-1 border rounded-lg' />
        </div>
    )
}
);
export default FormInput