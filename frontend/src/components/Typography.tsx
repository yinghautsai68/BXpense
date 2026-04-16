import { Children } from "react"

type TitleProps = {
    className?: string,
    children: React.ReactNode
}
export const Title = ({ className, children }: TitleProps) => {
    return (
        <div className={`${className}  text-3xl font-bold`}>
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

export const CardTitle = ({ className, children }: TitleProps) => {
    return (
        <div className={`text-sm font-bold ${className}`}>
            {children}
        </div>
    )
}
