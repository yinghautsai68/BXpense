const ExpenseCard = () => {
    return (
        <div className='flex flex-row justify-between items-center  py-2 '>
            <div className='flex flex-row items-center gap-2'>
                <div className='w-8 aspect-square bg-black'></div>
                <span className="text-sm font-bold">餐飲</span>
            </div>
            <div className='flex flex-col items-end'>
                <span className="text-xs font-bold">-NTD 6999</span>
                <span className="text-xs">上午 6:21</span>
            </div>
        </div>
    )
}

export default ExpenseCard