import Link from "next/link"

type RoleCard = {
    role: string;
    topics: string;
    experience: string;
    questionsCount: number;
    createdAt: Date;
    description: string;
}

const RoleCard = ({ role, topics, experience, questionsCount, createdAt, description }: RoleCard) => {
    const getInitials = (str: string): string => {
        let initials = ""
        const cleanedStr = str.trim()
        const splitStr = cleanedStr.split(" ")

        if (splitStr.length === 1) {
            const singleStr = splitStr[0]
            if (singleStr.length === 1) {
                initials = singleStr
            } else {
                initials = singleStr[0] + singleStr[1]
            }
        } else {
            initials = splitStr[0][0] + splitStr[1][0]
        }
        return initials.toUpperCase()
    }
    const formatDateWithSuffix = (dateInput: Date | string): string => {
        const date = new Date(dateInput)

        const day = date.getDate()
        const year = date.getFullYear()

        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ]

        const month = months[date.getMonth()]

        const getSuffix = (d: number): string => {
            if (d >= 11 && d <= 13) return "th"
            switch (d % 10) {
                case 1: return "st"
                case 2: return "nd"
                case 3: return "rd"
                default: return "th"
            }
        }

        return `${day}${getSuffix(day)} ${month} ${year}`
    }

    return (
        <Link href="#" className="block bg-white border border-muted shadow-xs p-2 rounded-xl">
            <div className="flex items-center gap-4 bg-linear-to-r from-gray-400/20 to-gray-400/10 p-3.5 rounded-lg">
                <div className="w-12 h-12 bg-white flex justify-center items-center rounded-lg">
                    <span className="font-semibold text-lg">{getInitials(role)}</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0 gap-0.5">
                    <span className="truncate font-semibold">{role}</span>
                    <span className="truncate text-xs">{topics}</span>
                </div>
            </div>
            <div className="flex gap-1 text-[10px] font-semibold p-3">
                <div className="min-w-0 truncate py-1.5 px-3 border border-foreground rounded-full">
                    <span>Exp: {experience} {Number(experience) === 1 ? "yr" : "yrs"}</span>
                </div>
                <div className="min-w-0 truncate py-1.5 px-3 border border-foreground rounded-full">
                    <span>{questionsCount} Q&A</span>
                </div>
                <div className="min-w-0 truncate py-1.5 px-3 border border-foreground rounded-full">
                    <span className="truncate">Last: {formatDateWithSuffix(createdAt)}</span>
                </div>
            </div>
            <p className="text-xs font-semibold px-3 pb-3 truncate">{description}</p>
        </Link>
    )
}

export default RoleCard