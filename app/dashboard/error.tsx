"use client"

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="h-[calc(100dvh-64px)] lg:h-[calc(100dvh-72px)] flex flex-col gap-4 lg:gap-6 justify-center items-center">
            <h2 className="text-lg lg:text-xl text-foreground/80">An error occurred</h2>
            <Button className="bg-foreground hover:bg-foreground/90 px-5" onClick={() => reset()}>Try again</Button>
        </div>
    )
}