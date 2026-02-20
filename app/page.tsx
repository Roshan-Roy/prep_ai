import GoogleSignInButton from "@/components/googleSignInButton/GoogleSignInButton"
import { BsStars } from "react-icons/bs"
import Link from "next/link"

const Page = () => {
  return (
    <>
      <div className="flex justify-between items-center mx-auto w-17/20 h-16 lg:h-18 max-w-6xl">
        <Link href="/" className="font-semibold lg:text-lg">PrepAI</Link>
        <GoogleSignInButton variant="header" />
      </div>
      <div className="h-[calc(100dvh-64px)] lg:h-[calc(100dvh-72px)] min-h-140 md:min-h-115 w-17/20 max-w-2xl mx-auto flex flex-col justify-center items-center gap-3 md:gap-4 text-center">
        <span className="inline-flex gap-1.5 items-center px-5 py-2 rounded-full font-semibold text-sm mb-1 border border-primary text-primary bg-primary/10"><BsStars />AI Powered</span>
        <span className="font-bold leading-relaxed text-2xl md:text-3xl lg:text-4xl">
          Turn Your Dream Job Into Reality with{" "}
          <span className="bg-linear-to-r from-violet-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            AI-Powered
          </span>{" "}
          Interview Preparation
        </span>
        <p className="leading-relaxed lg:text-lg text-foreground/70">Generate personalized interview questions and detailed answers tailored to your chosen role, experience level, and skills, helping you practice consistently, strengthen your understanding, and build the confidence needed to succeed in real-world interviews.</p>
        <GoogleSignInButton />
      </div>
    </>
  )
}

export default Page