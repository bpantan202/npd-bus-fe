import { cookies } from "next/headers";
import { BookingDTO } from "@/dto/booking.dto";

const API_URL = "http://localhost:8080";

export const getBookingByCodeServer = async (
  code: string
): Promise<BookingDTO> => {
  const cookieStore = await cookies();

  // convert cookies to header string
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${API_URL}/api/bookings/${code}`, {
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Booking API Error:", data);
    throw new Error(data.message || "Failed to fetch booking");
  }

  return data;
};