type IconProps = {
    className?: string,
    onClick?: () => void;
    isSelected?: boolean,
    image_url?: string,
    children?: React.ReactNode
}
const Icon = ({ className, onClick, isSelected = false, image_url = '', children = '' }: IconProps) => {
    return (
        <div onClick={onClick} className={`flex flex-row justify-center items-center w-15 p-3 aspect-square  rounded-full bg-white cursor-pointer ${className} ${isSelected ? 'border-2 border-yellow-500' : ''}   `}>
            <img src={image_url} alt="" />
            {children}
        </div>
    )
}

export default Icon