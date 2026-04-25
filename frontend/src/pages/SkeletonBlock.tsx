type SkeletonCardProps = {
    className?: string,
}
const SkeletonBlock = ({ className }: SkeletonCardProps) => {
    return (
        <div className={`bg-gray-300 rounded-xl animate-pulse ${className}`}></div>
    )
}

export default SkeletonBlock;