import Card from '../components/Card'
import { SubTitle } from '../components/Typography'
import RecordTag from '../components/RecordTag'

const Profile = () => {
    return (
        <>
            <SubTitle>我的帳號</SubTitle>
            <Card className='flex flex-col'>
                <div className='flex flex-row items-center gap-2'>
                    <div className='w-10 aspect-square rounded-xl bg-black'></div>
                    <span>蔡英豪</span>
                </div>
                <div className='grid grid-cols-3 '>
                    <div className='flex flex-col justify-center '>
                        <span className=''>total</span>
                        <span>NTD26,500</span>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <span>total</span>
                        <span>NTD26,500</span>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <span>total</span>
                        <span>500</span>
                    </div>
                </div>
            </Card>



            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row items-center gap-4 w-full'>
                    <SubTitle>
                        我的類別
                    </SubTitle>
                    <div className='flex flex-row items-center gap-2'>
                        <span className='underline underline-offset-4 '>支出</span>
                        <span>收入</span>
                    </div>
                </div>
                <div className='px-2 py-1 bg-yellow-500 rounded-xl cursor-pointer'>+</div>
            </div>
            <Card className='grid grid-cols-4 gap-5'>
                <RecordTag></RecordTag>
                <RecordTag></RecordTag>
                <RecordTag></RecordTag>

                <RecordTag></RecordTag>
                <RecordTag></RecordTag>
                <RecordTag></RecordTag>

                <RecordTag></RecordTag>
                <RecordTag></RecordTag>
                <RecordTag></RecordTag>
            </Card>

            <SubTitle>其他</SubTitle>
            <Card className='text-center text-rose-600'>刪除所有資料</Card>
        </>
    )
}

export default Profile