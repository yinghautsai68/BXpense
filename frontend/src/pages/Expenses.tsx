import ExpenseCard from '../components/ExpenseCard'

const Expenses = () => {
    return (
        <>
            <div className='flex flex-col gap-4 p-2 bg-white rounded-lg text-sm'>
                <div className='flex flex-row justify-between'>
                    <span className='text-gray-600 font-bold'>月支出</span>
                    <span>NTD 1000</span>
                </div>
                <div className='flex flex-row justify-between'>
                    <span className='text-gray-600 font-bold'>月收入</span>
                    <span>NTD 1000</span>
                </div>
                <div className='flex flex-row justify-between'>
                    <span className='text-gray-600 font-bold'>月結餘</span>
                    <span>NTD 1000</span>
                </div>
            </div>

            <div className='flex flex-col gap-3'>
                <div className='flex flex-col'>
                    <span>2026年4月6日 週一</span>
                    <div className='flex flex-col  divide-y divide-gray-300 w-full px-3 py-1 bg-white rounded-lg'>
                        <ExpenseCard></ExpenseCard>
                        <ExpenseCard></ExpenseCard>
                        <ExpenseCard></ExpenseCard>
                        <ExpenseCard></ExpenseCard>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span>2026年4月6日 週一</span>
                    <div className='flex flex-col  divide-y divide-gray-300 w-full px-2 bg-white rounded-lg'>
                        <ExpenseCard></ExpenseCard>
                        <ExpenseCard></ExpenseCard>
                        <ExpenseCard></ExpenseCard>
                        <ExpenseCard></ExpenseCard>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Expenses