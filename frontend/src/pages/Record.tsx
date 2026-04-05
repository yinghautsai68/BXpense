import React from 'react'
import RecordTag from '../components/RecordTag'
import CalculatorButton from '../components/CalculatorButton'

const Record = () => {
    return (
        <div className='flex flex-col gap-2 w-full h-screen pt-20'>
            <div className='flex flex-row justify-center items-center gap-10 w-full'>
                <span>asdf</span>
                <span>asdf</span>
                <span>asdf</span>
            </div>

            <div className='grid grid-cols-4 gap-2  px-4 pb-60  overflow-y-scroll'>
                <RecordTag></RecordTag>
                <RecordTag></RecordTag>
                <RecordTag></RecordTag>
                <RecordTag></RecordTag>
                <RecordTag></RecordTag>
                <RecordTag></RecordTag>
                <RecordTag></RecordTag>
                <RecordTag></RecordTag>

                <RecordTag></RecordTag>
                <RecordTag></RecordTag>
                <RecordTag></RecordTag>
                <RecordTag></RecordTag>

                <RecordTag></RecordTag>
                <RecordTag></RecordTag>
                <RecordTag></RecordTag>
                <RecordTag></RecordTag>
            </div>

            <div className='fixed left-0 bottom-0 flex flex-col gap-2 w-full h-[35%] px-2 pt-2 bg-gray-500 rounded-t-xl'>
                <input type="text" placeholder='0' className='w-full px-2 py-2 border bg-white rounded-lg text-end' />
                <div className='flex flex-row gap-1 w-full'>
                    <div className='grid grid-cols-3 gap-1 w-[70%]'>
                        <CalculatorButton>7</CalculatorButton>
                        <CalculatorButton>8</CalculatorButton>
                        <CalculatorButton>9</CalculatorButton>

                        <CalculatorButton>4</CalculatorButton>
                        <CalculatorButton>5</CalculatorButton>
                        <CalculatorButton>6</CalculatorButton>

                        <CalculatorButton>1</CalculatorButton>
                        <CalculatorButton>2</CalculatorButton>
                        <CalculatorButton>3</CalculatorButton>

                        <CalculatorButton>.</CalculatorButton>
                        <CalculatorButton>0</CalculatorButton>
                        <CalculatorButton>今天</CalculatorButton>
                    </div>
                    <div className='grid gird-cols-2 gap-1 w-[30%]  '>
                        <CalculatorButton className='col-span-2'>delete</CalculatorButton>

                        <CalculatorButton>+</CalculatorButton>
                        <CalculatorButton>*</CalculatorButton>

                        <CalculatorButton>-</CalculatorButton>
                        <CalculatorButton>/</CalculatorButton>

                        <CalculatorButton className='col-span-2 bg-yellow-400'>//</CalculatorButton>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Record