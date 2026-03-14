import { LoginRequestDTO, LoginResponseDTO } from "@/dto/auth.dto";

const API_URL = "http://localhost:8080";

export const login = async (
  data: LoginRequestDTO,
): Promise<LoginResponseDTO> => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result: LoginResponseDTO = await res.json();

  if (!res.ok) {
    throw new Error(result.message);
  }

  return result;
};
