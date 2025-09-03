"use client"

import { EmailStep } from "@/components/auth/register/signup-email"
import StepManager from "@/components/auth/register/step-manager"
import type { Dob, Step } from "@/types/signup-types"
import { RenderStepProps } from "@/types/signup-types"

export function RenderStep({
  step,
  email,
  setEmail,
  password,
  setPassword,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  dob,
  setDob,
  nextStep,
  prevStep,
  username,
  setUsername,
}: RenderStepProps) {
  if (step === "email") {
    return <EmailStep storeEmail={email} setEmail={setEmail} onNext={nextStep} />
  }

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
      username={username}
      setUsername={setUsername}
    />
  )
}
