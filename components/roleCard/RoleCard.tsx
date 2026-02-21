const RoleCard = () => {
    return (
        <div className="bg-white border border-muted shadow-xs p-2 rounded-xl">
            <div className="flex items-center gap-4 bg-linear-to-r from-gray-400/20 to-gray-400/10 p-3.5 rounded-lg">
                <div className="w-12 h-12 bg-white flex justify-center items-center rounded-lg">
                    <span className="font-semibold text-lg">FD</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0 gap-0.5">
                    <span className="truncate font-semibold">Frontend Developer</span>
                    <span className="truncate text-xs">React JS, DOM Manipulation, CSS</span>
                </div>
            </div>
            <div className="flex gap-1 text-[10px] font-semibold p-3">
                <div className="min-w-0 truncate py-1.5 px-3 border border-foreground rounded-full">
                    <span>Exp: 2 yrs</span>
                </div>
                <div className="min-w-0 truncate py-1.5 px-3 border border-foreground rounded-full">
                    <span>10 Q&A</span>
                </div>
                <div className="min-w-0 truncate py-1.5 px-3 border border-foreground rounded-full">
                    <span className="truncate">Last: 30th Apr 2026</span>
                </div>
            </div>
            <p className="text-xs font-semibold px-3 pb-3 truncate">This is some explanations for the role given</p>
        </div>
    )
}

export default RoleCard