import { axiosClient } from "../apiClint";

export function generatePassword() {
  return axiosClient.get("/api/Auth/generate-password");
}
