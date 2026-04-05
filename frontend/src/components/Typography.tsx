
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