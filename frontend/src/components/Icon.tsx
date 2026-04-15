type IconProps = {
    onClick: () => void;
    isSelected: boolean,
    image_url: string
}
const Icon = ({ onClick, isSelected = false, image_url = '' }: IconProps) => {
    return (
        <div onClick={onClick} className={`${isSelected ? 'border-2 border-yellow-500' : ''} flex flex-row justify-center items-center w-15 p-3 aspect-square  rounded-full bg-white  `}>
            <img src={image_url} alt="" />
        </div>
    )
}

export default Icon