export interface PassengerDTO {
  id_type: string
  id_number: string
  name: string
  surname: string
  phone: string
  email: string
  gender: string
}

export interface UserDTO {
  _id: string
  username: string
}

export interface RouteDTO {
  _id: string
  origin: string
  destination: string
}

export interface RoundDTO {
  _id: string
  route_id: RouteDTO
  bus_type: string
  departure: string
  arrival: string
  platform_number: string
}

export interface BookingDTO {
  _id: string
  booking_code: string
  status: string
  departure_date: string
  seat_number: string
  pickup_point: string
  dropoff_point: string
  passenger: PassengerDTO
  user_id: UserDTO
  round_id: RoundDTO
  createdAt: string
}