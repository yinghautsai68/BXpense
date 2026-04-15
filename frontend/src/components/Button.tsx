type ButtonProps = {
    onClick?: () => void,
    className?: string,
    children: React.ReactNode,

}

const Button = ({ onClick, className, children }: ButtonProps) => {
    return (
        <button onClick={onClick} className={`  p-1 rounded-lg  font-bold cursor-pointer transition-all ${className} `}>
            {children}
        </button>
    )
}

export default Button