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

export default formatDateWithSuffix