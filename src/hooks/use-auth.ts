"use client"

import { useEffect, useState } from "react"
import { User } from "@/types/models/user"
import { findBackend } from "@/helper/findBackend"
import Cookies from "js-cookie"

const API_BASE_URL = findBackend();

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      try {

        const res = await fetch(`${API_BASE_URL}/api/login/`, {
          credentials: "include", // important to send cookies
        })
        if (res.ok) {
          const data: User = await res.json()
          setIsLoggedIn(true)
          setUser(data)
        } else {
          setIsLoggedIn(false)
          setUser(null)
        }
      } catch (err) {
        console.error("Auth check failed:", err)
        setIsLoggedIn(false)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  // Define the logout function
  async function logout() {
    try {
      const csrfToken = Cookies.get("csrftoken")
      const res = await fetch(`${API_BASE_URL}/api/logout/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken || "",
        }, // Send cookies along with the request
      })

      if (res.ok) {
        // Clear the user session in state
        setIsLoggedIn(false)
        setUser(null)

        // Optionally, clear any authentication-related cookies (e.g., csrfToken)

        window.location.reload();

      } else {
        console.error("Logout failed")
      }
    } catch (err) {
      console.error("Logout error:", err)
    }
  }

  return { isLoggedIn, user, loading, logout }
}
