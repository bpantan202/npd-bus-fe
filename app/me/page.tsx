"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface Passenger {
  id_type: string;
  id_number: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  gender: string;
}

interface UserProfile {
  _id: string;
  username: string;
  role: string;
  passenger: Passenger;
}

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8080/auth/me", {
          credentials: "include",
        });

        const data = await res.json();

        // ถ้า user ไม่พบ
        if (data.message === "User not found") {
          router.push("/login");
          return;
        }

        setUser(data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
        router.push("/login");
      }
    };

    fetchProfile();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (!user) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  const passenger = user.passenger;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <Avatar className="w-20 h-20 text-2xl">
          <AvatarFallback className="bg-sky-700 text-white">
            {passenger.name[0]}
            {passenger.surname[0]}
          </AvatarFallback>
        </Avatar>

        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold text-sky-700">
            {passenger.name} {passenger.surname}
          </h1>

          <p className="text-gray-500">@{user.username}</p>

          <Badge
            className={`mt-2 px-4 text-white capitalize ${
              user.role === "admin" ? "bg-pink-600" : "bg-yellow-600"
            }`}
          >
            {user.role}
          </Badge>
        </div>
      </div>

      {/* PROFILE INFO */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-sky-700">ข้อมูลผู้โดยสาร</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-gray-400">ชื่อ</p>
            <p className="font-semibold">{passenger.name}</p>
          </div>

          <div>
            <p className="text-gray-400">นามสกุล</p>
            <p className="font-semibold">{passenger.surname}</p>
          </div>

          <div>
            <p className="text-gray-400">เบอร์โทรศัพท์</p>
            <p className="font-semibold">{passenger.phone}</p>
          </div>

          <div>
            <p className="text-gray-400">อีเมล</p>
            <p className="font-semibold">{passenger.email}</p>
          </div>

          <div>
            <p className="text-gray-400">เพศ</p>
            <p className="font-semibold capitalize">{passenger.gender}</p>
          </div>
        </CardContent>
      </Card>
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-white border-2 border-sky-700 font-semibold text-sky-700 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
