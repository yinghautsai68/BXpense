import React from 'react'

type FormInputProps = {
    label: string,
    name: string,
    value?: string,
    type: string,
    required: boolean,
    placeholder?: string,

    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(({ label, name, value, type, placeholder, required, onChange }, ref) => {
    return (
        <div className='flex flex-col w-full max-w-md'>
            <label htmlFor={name} className='font-bold'>{label}</label>
            <input ref={ref} onChange={onChange} id={name} name={name} value={value} type={type} placeholder={placeholder} required={required} className={`${type === 'file' ? 'hidden' : ''} px-2 py-1 border rounded-lg`} />
        </div>
    )
}
);
export default FormInput