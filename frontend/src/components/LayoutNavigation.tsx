type LayoutNavigationProps = {
    isActive: boolean;
    icon: string,
    activeIcon: string,
    label: string,
};

const LayoutNavigation = ({ isActive = false, icon = '', activeIcon = '', label = '' }: LayoutNavigationProps) => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <img src={isActive ? activeIcon : icon} alt="icon" className='w-8' />
            <span className={`text-xs ${isActive ? 'font-bold' : ''}`}>{label}</span>
        </div>
    )
}

export default LayoutNavigation