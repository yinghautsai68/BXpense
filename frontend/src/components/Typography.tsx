
type TitleProps = {
    className?: string,
    children: React.ReactNode
}
export const Title = ({ className, children }: TitleProps) => {
    return (
        <div className={`${className} w-full text-3xl font-bold`}>
            {children}
        </div>
    )
}

export const SubTitle = ({ className, children }: TitleProps) => {
    return (
        <div className={`${className}  text-xl font-medium `}>
            {children}
        </div>
    )
}
