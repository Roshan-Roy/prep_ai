const ErrorPage = ({ message }: { message: string; }) => {
    return (
        <div className="h-[calc(100dvh-64px)] lg:h-[calc(100dvh-72px)] flex justify-center items-center">
            <span className="text-lg lg:text-xl text-foreground/80">{message}</span>
        </div>
    )
}

export default ErrorPage