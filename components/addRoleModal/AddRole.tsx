"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { useState } from "react"

type FormData = {
    role: string
    experience: string
    topics: string
    description: string
}

const AddRole = () => {
    const [data, setData] = useState<FormData>({
        role: "",
        experience: "",
        topics: "",
        description: ""
    })
    const btnDisabled = Object.values(data).some(v => !v.trim())

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        alert("Heelo")
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="fixed right-2/20 bottom-14 rounded-full h-11 has-[>svg]:px-6 shadow-lg"><Plus className="size-5" /> Add New</Button>
            </DialogTrigger>
            <DialogContent className="p-8">
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                    <DialogHeader>
                        <DialogTitle className="leading-snug">Start a New Interview Journey</DialogTitle>
                        <DialogDescription>
                            Fill out a few quick details and unlock your personalized set of interview questions!
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup className="gap-6">
                        <Field>
                            <Label htmlFor="role">Target Role</Label>
                            <Input id="role" name="role" placeholder="e.g. Frontend Developer, UI/UX Designer, etc." className="h-10 px-3.5" value={data.role} onChange={handleInputChange} />
                        </Field>
                        <Field>
                            <Label htmlFor="experience">Years of Experience</Label>
                            <Input id="experience" name="experience" placeholder="e.g. 1 year, 3 years, 5+ years" className="h-10 px-3.5" value={data.experience} onChange={handleInputChange} />
                        </Field>
                        <Field>
                            <Label htmlFor="topics">Topics to Focus On</Label>
                            <Input id="topics" name="topics" placeholder="e.g. React, Node.js, MongoDB" className="h-10 px-3.5" value={data.topics} onChange={handleInputChange} />
                        </Field>
                        <Field>
                            <Label htmlFor="description">Description</Label>
                            <Input id="description" name="description" placeholder="Any specific goals or notes for this session" className="h-10 px-3.5" value={data.description} onChange={handleInputChange} />
                        </Field>
                    </FieldGroup>
                    <DialogFooter className="block mt-2">
                        <Button type="submit" className="w-full h-11" disabled={btnDisabled}>Create Session</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddRole
