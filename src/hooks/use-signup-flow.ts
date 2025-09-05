"use client"

import Cookies from "js-cookie"
import { useState } from "react"
import type { Step, Dob, SignupState } from "@/types/signup-types"
import { useRouter } from "next/navigation"

export function useSignupFlow() {
  const [step, setStep] = useState<Step>("email")

  const [email, setEmail] = useState<SignupState["email"]>("")
  const [firstName, setFirstName] = useState<SignupState["firstName"]>("")
  const [lastName, setLastName] = useState<SignupState["lastName"]>("")
  const [username, setUsername] = useState<SignupState["username"]>("")
  const [dob, setDob] = useState<Dob>({ day: "", month: "", year: "" })
  const [password, setPassword] = useState<SignupState["password"]>("")

  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND;


  const router = useRouter()
  const submitForm = async () => {
    const formattedDob = `${dob.year}-${parseInt(dob.month)}-${parseInt(dob.day)}`

    try {
      const csrfToken = Cookies.get("csrftoken")
      const res = await fetch(`${API_BASE_URL}api/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken || "",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          firstname: firstName,
          lastname: lastName,
          username,
          dob: formattedDob,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Signup failed")
      }

      const data = await res.json()
      console.log("Signup success:", data)

      // Redirect to login after success
      router.push("/login")
    } catch (err) {
      console.error("Error submitting signup:", err)
    }
  }

  const nextStep = () => {
    if (step === "email") setStep("password")
    else if (step === "password") setStep("details")
    else if (step === "details") setStep("username")
    else if (step === "username") setStep("terms")
    else if (step === "terms") {
      submitForm()
    }
  }

  const prevStep = () => {
    if (step === "terms") setStep("username")
    else if (step === "username") setStep("details")
    else if (step === "details") setStep("password")
    else if (step === "password") setStep("email")
  }

  return {
    step,
    setStep,
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    username,
    setUsername,
    dob,
    setDob,
    password,
    setPassword,
    nextStep,
    prevStep,
  }
}
