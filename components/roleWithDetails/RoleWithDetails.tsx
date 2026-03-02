"use client"

import { Prisma } from "@/generated/prisma/client"

type RoleWithQuestions = Prisma.RoleGetPayload<{
    include: {
        questions: true
    }
}>

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "../ui/button"
import { useState, use } from "react"
import { Spinner } from "../ui/spinner"
import formatDateWithSuffix from "@/utils/formatDateWithSuffix"
import toast from "react-hot-toast"

const RoleWithDetails = ({
    roleId,
    rolePromise,
}: {
    roleId: string;
    rolePromise: Promise<RoleWithQuestions>;
}) => {
    const role = use(rolePromise)

    const [data, setData] = useState(role)
    const [btnLoading, setBtnLoading] = useState(false)

    const handleLoadMoreQuestions = async () => {
        try {
            setBtnLoading(true)

            const res = await fetch("/api/morequestions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ roleId }),
            })
            if (!res.ok) {
                throw new Error("Failed to add role")
            }

            const updatedRole = await res.json()
            setData(updatedRole.data)
        } catch (e) {
            toast.error("An error occurred")
        } finally {
            setBtnLoading(false)
        }
    }

    return (
        <>
            <div className="bg-white py-8 md:py-10">
                <div className="flex flex-col mx-auto w-17/20 max-w-6xl">
                    <span className="font-semibold text-xl md:text-3xl truncate">{data.role}</span>
                    <span className="text-sm md:text-base mt-1.5 md:mt-2 mb-3.5 md:mb-4 truncate">{data.topics}</span>
                    <div className="flex gap-1 text-[10px] md:text-[12px] font-semibold">
                        <div className="min-w-0 truncate py-1.5 md:py-2 px-3.5 md:px-5 bg-foreground text-background rounded-full">
                            <span>Exp: {data.experience} {Number(data.experience) === 1 ? "yr" : "yrs"}</span>
                        </div>
                        <div className="min-w-0 truncate py-1.5 md:py-2 px-3.5 md:px-5 bg-foreground text-background rounded-full">
                            <span>{data.questions.length} Q&A</span>
                        </div>
                        <div className="min-w-0 truncate py-1.5 md:py-2 px-3.5 md:px-5 bg-foreground text-background rounded-full">
                            <span className="truncate">Last: {formatDateWithSuffix(data.updatedAt)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 pt-4 md:pt-6 pb-14 md:pb-18">
                <div className="mx-auto w-17/20 max-w-6xl">
                    <span className="font-semibold text-lg">Interview Q & A</span>
                    <div className="mt-0.5 md:mt-1">
                        <Accordion type="multiple">
                            {data.questions.map(e => (
                                <AccordionItem value={e.id} key={e.id}>
                                    <AccordionTrigger className="md:text-base gap-8 leading-relaxed">{e.question}</AccordionTrigger>
                                    <AccordionContent className="md:text-base pb-6 leading-relaxed">
                                        {e.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                        <Button className="flex gap-2.5 bg-foreground hover:bg-foreground/90 w-full mt-6 mx-auto md:mt-10 md:w-42 h-10" onClick={handleLoadMoreQuestions} disabled={btnLoading}>{btnLoading && <Spinner />}Load More</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RoleWithDetails 