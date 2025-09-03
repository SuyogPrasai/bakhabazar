// Possible steps in the signup flow
export type Step = "email" | "password" | "details" | "terms" | "username"

// Date of birth structure
export interface Dob {
  day: string
  month: string
  year: string
}

// Signup state
export interface SignupState {
  email: string
  firstName: string
  lastName: string
  username: string
  dob: Dob
  password: string
}

export interface RenderStepProps {
  step: Step
  email: string
  setEmail: (v: string) => void
  password: string
  setPassword: (v: string) => void
  firstName: string
  setFirstName: (v: string) => void
  lastName: string
  setLastName: (v: string) => void
  dob: Dob
  setDob: (dob: Dob) => void
  nextStep: () => void
  prevStep: () => void
  username: string
  setUsername: (v: string) => void
}

export interface StepManagerProps {
  step: Step
  prevStep: () => void
  nextStep: () => void

  // Password step
  password: SignupState["password"]
  setPassword: (password: SignupState["password"]) => void

  // Details step
  firstName: SignupState["firstName"]
  setFirstName: (firstName: SignupState["firstName"]) => void
  lastName: SignupState["lastName"]
  setLastName: (lastName: SignupState["lastName"]) => void
  dob: SignupState["dob"]
  setDob: (dob: SignupState["dob"]) => void

  // Username step
  username: SignupState["username"]
  setUsername: (username: SignupState["username"]) => void
}

