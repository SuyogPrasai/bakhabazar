"use client"

import { UsernameStep } from "@/components/auth/login/login-username"
import PasswordStep from "./password-step"
import type { RenderLoginStepProps } from "@/types/login-types"

export function RenderLoginStep({
  step,
  username,
  setUsername,
  password,
  setPassword,
  nextStep,
  prevStep,
}: RenderLoginStepProps) {
  if (step === "username") {
    return <UsernameStep storeUsername={username} setUsername={setUsername} onNext={nextStep} />
  }

  if (step === "password") {
    return (
      <PasswordStep
        password={password}
        setPassword={setPassword}
        onNext={nextStep}
        onBack={prevStep}
      />
    )
  }

  return null
}
