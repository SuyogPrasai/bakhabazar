"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { FaApple } from "react-icons/fa"

interface EmailStepProps {
  storeEmail: string
  setEmail: (email: string) => void
  onNext: () => void
}

export function EmailStep({ storeEmail, setEmail, onNext }: EmailStepProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (storeEmail.trim()) {
      onNext()
    }
  }

  return (

    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-2"
    >
      {/* Logo */}
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-5xl font-extrabold text-secondary font-ubuntu">
          Sign up to start listening
        </h1>
      </div>

      <div className="flex flex-col w-[90%] mx-auto">
        {/* Email Input */}
        <div className="grid gap-2 text-left mt-5 bg-sidebar">
          <Label
            htmlFor="email"
            className="text-secondary font-semibold font-ubuntu"
          >
            Email address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={storeEmail}
            placeholder="Enter your email address"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-secondary p-6 border-highlight mt-2 font-semibold"
          />
        </div>

        {/* Primary Button */}
        <Button
          type="submit"
          className="bg-primary font-bold text-primary-foreground hover:bg-primary/90 cursor-pointer rounded-full py-6 w-[90%] mx-auto mt-5"
        >
          Next
        </Button>

        {/* Divider */}
        <div className="relative my-2 text-sm text-muted-foreground">
          <span className="relative text-secondary px-2 text-lg">or</span>
        </div>

        {/* Social Signups */}
        <div className="grid gap-4">
          <Button
            variant="outline"
            type="button"
            className="w-full flex items-center gap-2 bg-sidebar text-secondary cursor-pointer py-5 border-highlight rounded-full"
          >
            <Image
              src="/icons/google.svg"
              alt="Google Logo"
              width={20}
              height={20}
              className="h-5 w-5"
            />
            Sign up with Google
          </Button>

          <Button
            variant="outline"
            type="button"
            className="w-full flex items-center gap-2 bg-sidebar text-secondary cursor-pointer py-5 border-highlight rounded-full"
          >
            <FaApple className="h-8 w-8 text-white" />
            Sign up with Apple
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-sm text-secondary mt-1">
        Already have an account?{" "}
        <a href="#" className="underline underline-offset-4 text-secondary">
          Log in here.
        </a>
      </div>
    </form>
  )
}
