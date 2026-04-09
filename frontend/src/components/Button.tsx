type ButtonProps = {
    onClick?: () => void,
    className?: string,
    children: React.ReactNode,

}

const Button = ({ onClick, className, children }: ButtonProps) => {
    return (
        <button onClick={onClick} className={` ${className} w-full py-1rounded-lg text-white font-bold cursor-pointer transition-all `}>
            {children}
        </button>
    )
}

export default Button