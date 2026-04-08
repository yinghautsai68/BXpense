type ButtonProps = {
    className?: string,
    children: React.ReactNode
}

const Button = ({ className, children }: ButtonProps) => {
    return (
        <button className={`${className} w-full py-1 bg-yellow-500 hover:bg-yellow-700 rounded-lg text-white font-bold cursor-pointer transition-all`}>
            {children}
        </button>
    )
}

export default Button