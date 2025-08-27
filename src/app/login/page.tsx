import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-1 flex-col items-center justify-center space-y-8">
        {/* Netflix Logo */}
        <div className="text-center">
          <h1 className="text-red-600 text-5xl tracking-widest font-bebas-neue">
            BAKHABAZAR
          </h1>
        </div>

        {/* Login Form */}
        <div className="w-full max-w-xs">
          <LoginForm />
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/login_featured.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
