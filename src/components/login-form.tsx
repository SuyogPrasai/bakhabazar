import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaApple, FaGoogle, FaFacebook } from "react-icons/fa"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-accent">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Form Section */}
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              {/* Title */}
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-secondary">
                  Welcome back
                </h1>
                <p className="text-highlight-light text-balance">
                  Login to your BakhaBazar account
                </p>
              </div>

              {/* Email */}
              <div className="grid gap-3">
                <Label htmlFor="email" className="text-secondary/80">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="text-highlight-light"
                />
              </div>

              {/* Password */}
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-secondary/80">
                    Password
                  </Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline text-highlight-light"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  className="text-highlight-light"
                />
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full cursor-pointer bg-secondary text-background hover:bg-secondary/80"
              >
                Login
              </Button>

              {/* Divider */}
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-highlight-light relative z-10 px-2">
                  Or continue with
                </span>
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-3 gap-4">
                <SocialButton icon={FaApple} label="Apple" />
                <SocialButton icon={FaGoogle} label="Google" />
                <SocialButton icon={FaFacebook} label="Meta" />
              </div>

              {/* Footer */}
              <div className="text-center text-sm text-highlight-light">
                Don&apos;t have an account?{" "}
                <a
                  href="#"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Sign up
                </a>
              </div>
            </div>
          </form>

          {/* Side Image */}
          <div className="bg-muted relative hidden md:block">
            <img
              src="/login_featured.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      {/* Terms */}
      <div className="text-highlight-light text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary">
        By clicking continue, you agree to our{" "}
        <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}

/* Reusable Social Button */
function SocialButton({
  icon: Icon,
  label,
}: {
  icon: React.ElementType
  label: string
}) {
  return (
    <Button className="w-full bg-highlight-light/10 hover:bg-highlight-light/20 border-0 flex items-center justify-center cursor-pointer">
      <Icon className="w-5 h-5" />
      <span className="sr-only">Login with {label}</span>
    </Button>
  )
}
