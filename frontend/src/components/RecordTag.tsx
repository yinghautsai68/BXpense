import { categoryZhTW } from '../constants/categoryZhTw'
import type { CategoryType } from '../types/categories.type'

type RecordTagProps = {
    onClick: () => void,
    category: CategoryType
}
const RecordTag = ({ onClick, category }: RecordTagProps) => {
    return (
        <div onClick={onClick} className='flex flex-col items-center'>
            <img src={category.image_url} className='w-full p-2 aspect-square border border-gray-400 rounded-xl' />
            <span className='text-xs'>{categoryZhTW[category.name] || category.name}</span>
        </div>
    )
}

export default RecordTag