import { BookingDTO } from "@/dto/booking.dto"

export const getMyBookings = async (): Promise<BookingDTO[]> => {
  const res = await fetch("http://localhost:8080/api/bookings/my-booking", {
    credentials: "include",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch bookings")
  }

  return res.json()
}