import React, { useRef } from 'react'

type InformationProps = {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    className?: string

    label: string,
    name?: string,
    value: string | number,
    type?: 'text' | 'number' | 'file'
}
const Information = ({ onChange, className, label, name, value, type }: InformationProps) => {
    const ref = useRef<HTMLInputElement>(null);
    const handleClick = () => {
        ref.current?.click();
    }
    return (
        <div className={`${className} flex flex-row justify-between gap-25 w-full`}>
            <span className='text-lg font-medium'>{label}</span>
            {
                type === 'file' ? (<>
                    <div onClick={handleClick}>
                        {
                            value ? (
                                <img src={typeof value === 'string' ? value : ''} alt="" className='w-10 aspect-square rounded-lg object-cover cursor-pointer ' />
                            )
                                : (
                                    <span>請添加照片</span>
                                )
                        }

                    </div>


                    <input ref={ref} type="file" name={name} onChange={onChange} placeholder='請輸入' className='hidden w-2 text-end' />
                </>)
                    : type === 'text' ?
                        (
                            <input type="text" name={name} value={value} onChange={onChange} placeholder='請輸入' className='flex-1 text-end ' />
                        )
                        : type === 'number' &&
                        (
                            <input type="number" name={name} value={value} onChange={onChange} placeholder='請輸入' className='text-end' />
                        )
            }

        </div>
    )
}

export default Information