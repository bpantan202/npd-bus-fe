import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">

      {/* Left Side */}
      <div className="hidden md:flex w-1/2 items-center justify-center text-sky-700">
        <h1 className="text-6xl font-semibold tracking-wide">
          นภาดรีมบัส
        </h1>
      </div>

      {/* Right Side */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50">
        <Card className="w-[420px] mx-5 px-3 py-20 shadow-xl flex flex-col gap-10 justify-center">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-sky-700">
              Login
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 justify-center space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="you@example.com" />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" placeholder="••••••••" />
            </div>

            {/* Button */}
            <Button className="h-10 w-full bg-yellow-600 hover:bg-yellow-700 text-white">
              Sign In
            </Button>

          </CardContent>
        </Card>
      </div>

    </div>
  )
}