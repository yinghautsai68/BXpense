import React from 'react'

const SavingsCard = () => {
    return (
        <div className='flex flex-row justify-between items-center px-4 py-4 bg-white rounded-xl'>
            <div className='flex flex-row items-center gap-2'>
                <div className='w-8 aspect-square bg-black'></div>
                <span>現金</span>
            </div>
            <span>NTD 50,000</span>
        </div>
    )
}

export default SavingsCard