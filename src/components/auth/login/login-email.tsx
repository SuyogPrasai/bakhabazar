"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { FaApple } from "react-icons/fa"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  emailVerifySchema,
  EmailFormValues,
} from "@/schemas/emailVerifySchema"
import { useState } from "react"

interface EmailStepProps {
  storeEmail: string
  setEmail: (email: string) => void
  onNext: () => void
}

export function EmailStep({ storeEmail, setEmail, onNext }: EmailStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailVerifySchema),
    defaultValues: { email: storeEmail },
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: EmailFormValues) => {
    setLoading(true)
    try {
      // Save email in parent state
      setEmail(data.email)

      // If you want to check email exists on server, add fetch here
      // Example:
      // const res = await fetch("/api/check-email", { method: "POST", body: JSON.stringify({ email: data.email }) })

      // Move to password step
      onNext()
    } catch (err) {
      console.error("Email validation failed", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-sm flex-col gap-2"
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-5xl font-extrabold text-secondary font-ubuntu">
          Log In to start playing
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
            type="email"
            placeholder="Enter your email address"
            {...register("email")}
            className="text-secondary p-6 border-highlight mt-2 font-semibold"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Next Button */}
        <Button
          type="submit"
          disabled={loading}
          className="bg-primary font-bold text-primary-foreground hover:bg-primary/90 cursor-pointer rounded-full py-6 w-[90%] mx-auto mt-5"
        >
          {loading ? "Checking..." : "Next"}
        </Button>

        {/* Divider */}
        <div className="relative my-2 text-sm text-muted-foreground text-center">
          <span className="relative text-secondary px-2 text-lg">or</span>
        </div>

        {/* Social Buttons */}
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
            Log In with Google
          </Button>

          <Button
            variant="outline"
            type="button"
            className="w-full flex items-center gap-2 bg-sidebar text-secondary cursor-pointer py-5 border-highlight rounded-full"
          >
            <FaApple className="h-8 w-8 text-white" />
            Log In with Apple
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-sm text-secondary mt-1 text-center">
        Don’t have an account?{" "}
        <a href="/register" className="underline underline-offset-4 text-secondary">
          Sign up here.
        </a>
      </div>
    </form>
  )
}
