"use client"

import { ChevronLeft } from "lucide-react"

export interface StepLayoutProps {
  stepIndex: number
  steps: { title: string }[]
  onBack?: () => void
  children: React.ReactNode
}

export default function StepLayout({ stepIndex, steps, onBack, children }: StepLayoutProps) {
  const totalSteps = steps.length
  const currentStep = steps[stepIndex]

  return (
    <form className="flex w-full max-w-sm flex-col gap-6">
      {/* Progress Bar */}
      <div className="w-full h-[3px] bg-highlight rounded-full">
        <div
          className="h-[3px] bg-primary rounded-full"
          style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
        ></div>
      </div>

      {/* Back + Step + Title */}
      <div className="flex gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="text-secondary hover:text-primary"
          >
            <ChevronLeft className="h-8 w-8 text-highlight-semilight hover:text-highlight-light cursor-pointer" />
          </button>
        )}
        <div className="flex flex-col text-left">
          <span className="text-md font-bold text-highlight-semilight">
            Step {stepIndex + 1} of {totalSteps}
          </span>
          <h1 className="text-lg font-bold text-secondary font-ubuntu">
            {currentStep.title}
          </h1>
        </div>
      </div>

      {/* Step Content */}
      <div className="w-[90%] mx-auto">{children}</div>
    </form>
  )
}
