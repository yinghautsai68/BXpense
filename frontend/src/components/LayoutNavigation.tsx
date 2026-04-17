type LayoutNavigationProps = {
    isActive: boolean;
    icon: string,
    activeIcon: string,
    label: string,
};

const LayoutNavigation = ({ isActive = false, icon = '', activeIcon = '', label = '' }: LayoutNavigationProps) => {
    return (
        <div className='flex flex-col md:flex-row justify-center md:justify-start items-center md:gap-3  md:w-full md:py-3'>
            <img src={isActive ? activeIcon : icon} alt="icon" className='w-8 md:w-10' />
            <span className={`text-xs md:text-base ${isActive ? 'font-bold' : ''}`}>{label}</span>
        </div>
    )
}

export default LayoutNavigation