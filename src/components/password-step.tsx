"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, Eye, EyeOff, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface PasswordStepProps {
  password: string
  setPassword: (val: string) => void
  onNext: () => void
  onBack: () => void
  stepIndex: number
  totalSteps: number
}

export default function PasswordStep({
  password,
  setPassword,
  onNext,
  onBack,
  stepIndex,
  totalSteps,
}: PasswordStepProps) {
  const [showPassword, setShowPassword] = useState(false)

  // Validation rules
  const hasLetter = /[a-zA-Z]/.test(password)
  const hasNumberOrSpecial = /[\d\W]/.test(password)
  const hasMinLength = password.length >= 10

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (hasLetter && hasNumberOrSpecial && hasMinLength) {
      onNext()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-6"
    >
      {/* Progress Bar */}
      <div className="w-full h-[3px] bg-highlight rounded-full">
        <div
          className="h-[3px] bg-primary rounded-full"
          style={{ width: `${((stepIndex) / totalSteps) * 100}%` }}
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
            Step {stepIndex} of {totalSteps}
          </span>
          <h1 className="text-lg font-bold text-secondary font-ubuntu">
            Create a password
          </h1>
        </div>
      </div>

      {/* Step Content */}
      <div className="w-[90%] mx-auto">
        <div className="flex flex-col gap-4 text-left">
          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-secondary font-semibold">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-secondary p-6 pr-12 font-semibold border-highlight"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Validation checklist */}
          <div className="flex flex-col gap-2 text-sm text-secondary">
            <p className="font-bold">Your password must contain at least</p>
            <div className="flex items-center gap-2">
              <Check
                className={cn(
                  "h-4 w-4 rounded-full p-1",
                  hasLetter ? "bg-green-500" : "bg-muted-foreground"
                )}
              />
              <span>1 letter</span>
            </div>
            <div className="flex items-center gap-2">
              <Check
                className={cn(
                  "h-4 w-4 rounded-full p-1",
                  hasNumberOrSpecial ? "bg-green-500" : "bg-muted-foreground"
                )}
              />
              <span>1 number or special character (example: # ? ! &amp;)</span>
            </div>
            <div className="flex items-center gap-2">
              <Check
                className={cn(
                  "h-4 w-4 rounded-full p-1",
                  hasMinLength ? "bg-green-500" : "bg-muted-foreground"
                )}
              />
              <span>10 characters</span>
            </div>
          </div>

          {/* Next Button */}
          <Button
            type="submit"
            className="bg-primary font-bold text-secondary hover:bg-primary/70 cursor-pointer rounded-full py-6 w-full mt-5"
          >
            Next
          </Button>
        </div>
      </div>
    </form>
  )
}
