"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { EmailStep } from "@/components/signup-email"
import PasswordStep from "@/components/password-step"
import DetailStep from "@/components/details-step"

export default function LoginPage() {
  // Step control
  const [step, setStep] = useState<"email" | "details" | "password">("email")

  // Signup state
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [dob, setDob] = useState<{ day: string; month: string; year: string }>({
    day: "",
    month: "",
    year: "",
  })
  const [password, setPassword] = useState("")

  // Prefill email if query param exists
  const searchParams = useSearchParams()
  useEffect(() => {
    const emailFromUrl = searchParams.get("email")
    if (emailFromUrl) setEmail(emailFromUrl)
  }, [searchParams])

  // Step navigation
  const nextStep = () => {
    if (step === "email") setStep("password")
    else if (step === "password") setStep("details")

  }

  const prevStep = () => {
    if (step === "details") setStep("password")
    else if (step === "password") setStep("email")
  }

  const totalSteps = 3

  return (
    <div className="bg-sidebar flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col items-center justify-center gap-6 text-center">

          {step === "email" && (
            <EmailStep
              storeEmail={email}
              setEmail={setEmail}
              onNext={nextStep}
            />
          )}

          {step === "password" && (
            <PasswordStep
              password={password}
              setPassword={setPassword}
              onBack={prevStep}
              onNext={nextStep}
              stepIndex={1}
              totalSteps={totalSteps}
            />
          )}

          {step === "details" && (
            <DetailStep
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              dob={dob}
              setDob={setDob}
              onNext={nextStep}
              onBack={prevStep}
              stepIndex={2}
              totalSteps={totalSteps}
            />

          )}

          <p className="mt-6 max-w-sm text-xs text-secondary">
            By signing up, you agree to our{" "}
            <a href="#" className="underline underline-offset-4 text-secondary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-4 text-secondary">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
