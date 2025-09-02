"use client"

import { useState } from "react"
import { EmailStep } from "@/components/login/signup-email"
import StepManager from "@/components/login/step-manager"

export default function LoginPage() {
  // Step control
  const [step, setStep] = useState<
    "email" | "password" | "details" | "terms"
  >("email")

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

  // Step navigation
  const nextStep = () => {
    if (step === "email") setStep("password")
    else if (step === "password") setStep("details")
    else if (step === "details") setStep("terms")
    else if (step === "terms") {
      // Final submit action
      console.log("Submitting form:", {
        email,
        firstName,
        lastName,
        username,
        dob,
        password,
      })
      // TODO: call your signup API here
    }
  }

  const prevStep = () => {
    if (step === "terms") setStep("details")
    else if (step === "details") setStep("password")
    else if (step === "password") setStep("email")
  }

  // Branch rendering
  const renderStep = () => {
    if (step === "email") {
      return (
        <EmailStep storeEmail={email} setEmail={setEmail} onNext={nextStep} />
      )
    } else {
      return (
        <StepManager
          step={step}
          password={password}
          setPassword={setPassword}
          prevStep={prevStep}
          nextStep={nextStep}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          dob={dob}
          setDob={setDob}
        />
      )
    }
  }

  return (
    <div className="bg-sidebar flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          {renderStep()}

          {step !== "terms" && (
            <p className="mt-6 max-w-sm text-xs text-secondary">
              By signing up, you agree to our{" "}
              <a
                href="#"
                className="underline underline-offset-4 text-secondary"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="underline underline-offset-4 text-secondary"
              >
                Privacy Policy
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
