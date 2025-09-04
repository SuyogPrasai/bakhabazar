"use client"

import Cookies from "js-cookie"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoginStep } from "@/types/login-types"
import { toast } from "sonner"

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND;


export function useLoginFlow() {
  const [step, setStep] = useState<LoginStep>("email")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const submitLogin = async () => {
    try {
      setLoading(true)

      const csrfToken = Cookies.get("csrftoken")
      const res = await fetch(`${API_BASE_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken || "",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        let errorMsg = "Login failed"
        try {
          const errorData = await res.json()
          if (errorData?.detail) {
            errorMsg = errorData.detail
          }
        } catch {
          // fallback to generic message
        }
        throw new Error(errorMsg)
      }

      const data = await res.json()
      console.log("Login success:", data)

      // Save auth token if returned
      if (data.token) {
        Cookies.set("authToken", data.token)
      }

      toast.success("Login successful 🎉")

      // Redirect to dashboard or home
      router.push("/home")
    } catch (err: any) {
      console.error("Error logging in:", err)
      toast.error(err.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => {
    if (step === "email") setStep("password")
    else if (step === "password") {
      submitLogin()
    }
  }

  const prevStep = () => {
    if (step === "password") setStep("email")
  }

  return {
    step,
    setStep,
    email,
    setEmail,
    password,
    setPassword,
    nextStep,
    prevStep,
    loading,
  }
}
