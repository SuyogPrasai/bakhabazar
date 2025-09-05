// Possible steps in the login flow
export type LoginStep = "username" | "password"

// Login state
export interface LoginState {
  username: string
  password: string
}

// Props for rendering steps
export interface RenderLoginStepProps {
  step: LoginStep
  username: string
  setUsername: (v: string) => void
  password: string
  setPassword: (v: string) => void
  nextStep: () => void
  prevStep: () => void
}
