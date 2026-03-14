"use client";

import { useEffect, useState } from "react";
import { getMyBookings } from "@/services/booking.service";
import { BookingDTO } from "@/dto/booking.dto";
import { toast } from "sonner";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BusRoutesPage() {
  const [bookings, setBookings] = useState<BookingDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(data);
      } catch (err) {
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  const statusStyles: Record<string, string> = {
    confirmed: "bg-white border border-green-500 text-green-700",
    used: "bg-white border border-yellow-500 text-yellow-700",
    cancelled: "bg-white border border-red-500 text-red-700",
  };

  const busFooterStyles: Record<string, string> = {
    GOLD_CLASS: "bg-yellow-600",
    FIRST_CLASS: "bg-pink-600",
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-sky-700 mb-2">ตั๋วของฉัน</h1>
      <p className="mb-8 text-gray-500">รายการตั๋วของฉันทั้งหมด</p>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {bookings.map((booking) => (
          <Link
            key={booking.booking_code}
            href={`/ticket/${booking.booking_code}`}
          >
            <Card className="border border-gray-200 hover:shadow-lg hover:-translate-y-1 transform transition duration-200 pb-0">
              <CardHeader className="flex flex-row items-center justify-center">
                <CardTitle className="text-lg text-sky-700">
                  {booking.round_id.route_id.origin} {">"}{" "}
                  {booking.round_id.route_id.destination}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                {/* BOOKING CODE (BIGGEST) */}
                <div className="text-center border-y py-4">
                  <p className="text-xs text-gray-400">รหัสจอง</p>
                  <p className="text-3xl font-bold tracking-widest text-sky-700">
                    {booking.booking_code}
                  </p>
                </div>

                {/* SEAT + PLATFORM (BIG) */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-gray-50 rounded-lg py-3">
                    <p className="text-xs text-gray-400">ที่นั่ง</p>
                    <p className="text-xl font-semibold">
                      {booking.seat_number}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg py-3">
                    <p className="text-xs text-gray-400">ชานชาลา</p>
                    <p className="text-xl font-semibold">
                      {booking.round_id.platform_number}
                    </p>
                  </div>
                </div>

                {/* NORMAL INFO */}
                <div className="space-y-3 p-3">
                  {/* Passenger */}
                  <div className="rounded-lg ">
                    <p className="text-xs text-gray-400">ผู้โดยสาร</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {booking.passenger.name} {booking.passenger.surname}
                    </p>
                  </div>

                  {/* Date + Time */}
                  <div className="rounded-lg grid grid-cols-2 gap-6 items-center">
                    <div>
                      <p className="text-xs text-gray-400">วันเดินทาง</p>
                      <p className="text-base font-semibold">
                        {booking.departure_date}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">เวลา</p>
                      <p className="text-base font-semibold">
                        {booking.round_id.departure} -{" "}
                        {booking.round_id.arrival}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">จุดขึ้นรถ</p>
                    <p className="font-semibold text-gray-800">
                      {booking.pickup_point}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">จุดลงรถ</p>
                    <p className="font-semibold text-gray-800">
                      {booking.dropoff_point}
                    </p>
                  </div>
                </div>
              </CardContent>
              <div
                className={`w-full mt-4 px-4 py-3 rounded-b-xl text-neutral-100 flex justify-between items-center text-sm font-medium ${
                  busFooterStyles[booking.round_id.bus_type] || "bg-gray-900"
                }`}
              >
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full w-fit ${
                    statusStyles[booking.status] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {booking.status}
                </span>
                <span>{booking.round_id.bus_type}</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
