import React from 'react'
import ExpenseCard from '../components/ExpenseCard'

const Analysis = () => {
    return (
        <>
            <div className='flex flex-row items-center'>
                <button>支出</button>
                <button>支出</button>
            </div>

            <div className='w-full h-[180px] bg-white'>

            </div>

            <div className='w-full h-[180px] bg-white'>

            </div>

            <div className='flex flex-col w-full p-4 bg-white rounded-xl '>
                <div className='flex flex-row justify-between items-center'>
                    <span>單筆金額排行</span>
                    <span>TOP 10</span>
                </div>
                <div className='flex flex-col w-full  bg-white '>
                    <ExpenseCard></ExpenseCard>
                    <ExpenseCard></ExpenseCard>
                    <ExpenseCard></ExpenseCard>
                    <ExpenseCard></ExpenseCard>
                    <ExpenseCard></ExpenseCard>

                </div>
            </div>
        </>
    )
}

export default Analysis