import Card from '../components/Card'
import Icon from '../components/Icon'

const Categories = () => {

    return (
        <div className='flex flex-col bg-gray-200'>
            <div className='grid grid-cols-2'>
                <span className='text-center'>支出</span>
                <span className='text-center'>收入</span>
            </div>
            <div className='flex flex-col items-center gap-5 p-2'>
                <div className='w-20 aspect-square border-2 border-yellow-500 bg-white rounded-full'></div>
                <input type="text" placeholder='請輸入類別名稱' className='border-b text-center focus:outline-none' />
            </div>

            <Card className='grid grid-cols-4 content-start place-items-center gap-4 h-full bg-gray-200'>
                {
                    Array.from({ length: 20 }).map((_, i) => (
                        <Icon></Icon>
                    ))
                }


            </Card>
        </div>
    )
}

export default Categories