"use client";

import { useState } from "react";
import { login } from "@/services/auth.service";
import { LoginRequestDTO } from "@/dto/auth.dto";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);

      const payload: LoginRequestDTO = {
        username,
        password,
      };

      const res = await login(payload);

      toast.success(res.message);
      setTimeout(() => {
        router.push("/me");
      }, 800);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="hidden md:flex w-1/2 items-center justify-center text-sky-700">
        <h1 className="text-6xl font-semibold tracking-wide">นภาดรีมบัส</h1>
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
            {/* Username */}
            <div className="space-y-2">
              <Label>Username</Label>
              <Input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Button */}
            <Button
              onClick={handleLogin}
              disabled={loading}
              className="h-10 w-full bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
