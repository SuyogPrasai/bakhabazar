// Possible steps in the login flow
export type LoginStep = "email" | "password"

// Login state
export interface LoginState {
  email: string
  password: string
}

// Props for rendering steps
export interface RenderLoginStepProps {
  step: LoginStep
  email: string
  setEmail: (v: string) => void
  password: string
  setPassword: (v: string) => void
  nextStep: () => void
  prevStep: () => void
}
