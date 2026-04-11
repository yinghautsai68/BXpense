import Card from '../components/Card'
import Icon from '../components/Icon'

const Categories = () => {
    return (
        <div className='flex flex-col bg-white'>
            <div className='grid grid-cols-2'>
                <span className='text-center'>收入</span>
                <span className='text-center'>收入</span>
            </div>
            <div className='flex flex-col items-center gap-5 p-2'>
                <div className='w-20 aspect-square bg-black rounded-xl'></div>
                <input type="text" placeholder='請輸入類別名稱' className='border-b text-center' />
            </div>

            <Card className='grid grid-cols-4 content-start place-items-center gap-4 h-full bg-yellow-400'>
                <Icon></Icon>
                <Icon></Icon>
                <Icon></Icon>
                <Icon></Icon>
                <Icon></Icon>
                <Icon></Icon>
                <Icon></Icon>
                <Icon></Icon>
                <Icon></Icon>
                <Icon></Icon>
                <Icon></Icon>
                <Icon></Icon>

                <Icon></Icon>
                <Icon></Icon>
                <Icon></Icon>
                <Icon></Icon>

                <Icon></Icon>
                <Icon></Icon>
                <Icon></Icon>
                <Icon></Icon>

                <Icon></Icon>
                <Icon></Icon>
                <Icon></Icon>
                <Icon></Icon>
            </Card>
        </div>
    )
}

export default Categories