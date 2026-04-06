import React from 'react'
import { SubTitle } from '../components/Typography'
import SavingsCard from '../components/SavingsCard'

const Savings = () => {
    return (
        <>
            <div className='flex flex-col gap-4 w-full p-4 border-2 border-dashed bg-white rounded-xl'>
                <div className='flex flex-row justify-between items-center w-full'>
                    <div className='flex flex-col '>
                        <span className='text-xl'>淨資產</span>
                        <span className='text-4xl font-bold'>48,000</span>
                    </div>
                    <div className='w-20 aspect-square bg-black'>

                    </div>
                </div>
                <div className='flex flex-row'>
                    <div className='flex flex-col justify-start w-full'>
                        <span className='text-xl'>資產</span>
                        <span className='text-2xl'>NTD 48,000</span>
                    </div>
                    <div className='flex flex-col justify-start w-full'>
                        <span className='text-xl'>負債</span>
                        <span className='text-2xl'>48,000</span>
                    </div>
                </div>
            </div>

            <div className='flex flex-col'>
                <SubTitle>儲蓄帳戶</SubTitle>
                <div className='flex flex-col gap-2'>
                    <SavingsCard></SavingsCard>
                    <SavingsCard></SavingsCard>
                    <SavingsCard></SavingsCard>
                </div>
            </div>
        </ >
    )
}

export default Savings