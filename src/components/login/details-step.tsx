"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeft } from "lucide-react"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DetailStepProps {
  firstName: string
  setFirstName: (val: string) => void
  lastName: string
  setLastName: (val: string) => void
  dob: { day: string; month: string; year: string }
  setDob: (val: { day: string; month: string; year: string }) => void
  onNext: () => void
  onBack?: () => void
  stepIndex: number
  totalSteps: number
}

export default function DetailStep({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  dob,
  setDob,
  onNext,
  onBack,
  stepIndex,
  totalSteps,
}: DetailStepProps) {
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!dob.day || !dob.month || !dob.year) {
      setError("Please enter your date of birth.")
      return
    }
    setError("")
    onNext()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-6 text-left mx-auto"
    >
      <div className="flex flex-col w-[80%] gap-4 mx-auto">
        {/* First Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="firstName" className="text-secondary font-semibold">
            First Name
          </Label>
          <Input
            id="firstName"
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="text-secondary p-4 font-semibold border-highlight"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="lastName" className="text-secondary font-semibold">
            Last Name
          </Label>
          <Input
            id="lastName"
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="text-secondary p-4 font-semibold border-highlight"
          />
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col gap-2">
          <Label className="text-secondary font-semibold">Date of birth</Label>
          <span className="text-xs text-highlight-semilight">
            Why do we need your date of birth?{" "}
            <a href="#" className="underline">
              Learn more.
            </a>
          </span>
          <div className="flex gap-2 mt-2">
            {/* Day */}
            <Input
              type="text"
              placeholder="DD"
              maxLength={2}
              value={dob.day}
              onChange={(e) => setDob({ ...dob, day: e.target.value })}
              className="text-secondary p-4 font-semibold border-highlight w-16"
            />

            {/* Month with Shadcn Select */}
            <Select
              value={dob.month}
              onValueChange={(val) => setDob({ ...dob, month: val })}
            >
              <SelectTrigger className="w-32 text-secondary font-semibold border-highlight bg-sidebar">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent className="bg-sidebar text-secondary border border-highlight rounded-md">
                <SelectItem value="1">January</SelectItem>
                <SelectItem value="2">February</SelectItem>
                <SelectItem value="3">March</SelectItem>
                <SelectItem value="4">April</SelectItem>
                <SelectItem value="5">May</SelectItem>
                <SelectItem value="6">June</SelectItem>
                <SelectItem value="7">July</SelectItem>
                <SelectItem value="8">August</SelectItem>
                <SelectItem value="9">September</SelectItem>
                <SelectItem value="10">October</SelectItem>
                <SelectItem value="11">November</SelectItem>
                <SelectItem value="12">December</SelectItem>
              </SelectContent>
            </Select>

            {/* Year */}
            <Input
              type="text"
              placeholder="YYYY"
              maxLength={4}
              value={dob.year}
              onChange={(e) => setDob({ ...dob, year: e.target.value })}
              className="text-secondary p-4 font-semibold border-highlight w-24"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              ⚠ {error}
            </p>
          )}
        </div>

        {/* Next Button */}
        <Button
          type="submit"
          className="bg-primary font-bold text-secondary hover:bg-primary/70 cursor-pointer rounded-full py-6 w-full mt-5"
        >
          Next
        </Button>
      </div>
    </form>
  )
}
