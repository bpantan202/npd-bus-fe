import { BookingDTO } from "@/dto/booking.dto";
import { getBookingByCodeServer } from "@/services/booking.server";
import { QRCodeSVG } from "qrcode.react";

interface TicketPageProps {
  params: {
    ticket_id: string;
  };
}

export default async function TicketPage({ params }: TicketPageProps) {
  const { ticket_id } = await params; // ✅ ต้อง await

  const booking: BookingDTO = await getBookingByCodeServer(ticket_id);

  const statusStyles: Record<string, string> = {
    confirmed: "bg-white border border-green-500 text-green-700",
    used: "bg-white border border-yellow-500 text-yellow-700",
    cancelled: "bg-white border border-red-500 text-red-700",
  };

  const busFooterStyles: Record<string, string> = {
    GOLD_CLASS: "bg-yellow-600",
    FIRST_CLASS: "bg-pink-600",
  };

  if (!booking) {
    return <p className="p-6">Booking not found</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 border border-gray-200 rounded-xl shadow-sm">
      {/* ROUTE */}
      <div className="flex justify-center py-6 border-b">
        <h1 className="text-xl font-semibold text-sky-700">
          {booking.round_id.route_id.origin} {" > "}
          {booking.round_id.route_id.destination}
        </h1>
      </div>

      {/* BOOKING CODE */}
      <div className="text-center border-y py-6 space-y-4">
        <p className="text-xs text-gray-400">รหัสจอง</p>

        <p className="text-3xl font-bold tracking-widest text-sky-700">
          {booking.booking_code}
        </p>

        {/* QR CODE */}
        <div className="flex justify-center py-5">
          <QRCodeSVG
            value={booking.booking_code}
            size={140}
            bgColor="#ffffff"
            level="H"
          />
        </div>
      </div>

      {/* SEAT + PLATFORM */}
      <div className="grid grid-cols-2 gap-4 p-6 text-center">
        <div className="bg-gray-50 rounded-lg py-3">
          <p className="text-xs text-gray-400">ที่นั่ง</p>
          <p className="text-xl font-semibold">{booking.seat_number}</p>
        </div>

        <div className="bg-gray-50 rounded-lg py-3">
          <p className="text-xs text-gray-400">ชานชาลา</p>
          <p className="text-xl font-semibold">
            {booking.round_id.platform_number}
          </p>
        </div>
      </div>

      {/* PASSENGER INFO */}
      <div className="space-y-4 px-6 pb-6">
        <div>
          <p className="text-xs text-gray-400">ผู้โดยสาร</p>
          <p className="text-lg font-semibold text-gray-800">
            {booking.passenger.name} {booking.passenger.surname}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-gray-400">วันเดินทาง</p>
            <p className="font-semibold">{booking.departure_date}</p>
          </div>

          <div>
            <p className="text-xs text-gray-400">เวลา</p>
            <p className="font-semibold">
              {booking.round_id.departure} - {booking.round_id.arrival}
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-400">จุดขึ้นรถ</p>
          <p className="font-semibold text-gray-800">{booking.pickup_point}</p>
        </div>

        <div>
          <p className="text-xs text-gray-400">จุดลงรถ</p>
          <p className="font-semibold text-gray-800">{booking.dropoff_point}</p>
        </div>
      </div>

      {/* FOOTER */}
      <div
        className={`w-full px-6 py-4 text-neutral-100 flex justify-between items-center text-sm font-medium ${
          busFooterStyles[booking.round_id.bus_type] || "bg-gray-900"
        }`}
      >
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${
            statusStyles[booking.status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {booking.status}
        </span>

        <span>{booking.round_id.bus_type}</span>
      </div>
    </div>
  );
}
