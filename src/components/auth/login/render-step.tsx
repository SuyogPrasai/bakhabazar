"use client"

import { EmailStep } from "@/components/auth/login/login-email"
import PasswordStep from "./password-step"
import type { RenderLoginStepProps } from "@/types/login-types"

export function RenderLoginStep({
  step,
  email,
  setEmail,
  password,
  setPassword,
  nextStep,
  prevStep,
}: RenderLoginStepProps) {
  if (step === "email") {
    return <EmailStep storeEmail={email} setEmail={setEmail} onNext={nextStep} />
  }

  if (step === "password") {
    return (
      <PasswordStep
        password={password}
        setPassword={setPassword}
        onNext={nextStep}
        onBack={prevStep}
        stepIndex={1}
        totalSteps={1}
      />
    )
  }

  return null
}
