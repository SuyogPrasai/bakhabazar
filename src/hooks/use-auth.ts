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
        const csrfToken = Cookies.get("csrftoken")
        const res = await fetch(`${API_BASE_URL}/api/login/`, {
          credentials: "include", // important to send cookies
        })

        if (res.ok) {
          const data = await res.json()
          setIsLoggedIn(data.isLoggedIn)
          setUser(data.user)
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

  return { isLoggedIn, user, loading }
}
