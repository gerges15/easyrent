import { axiosClient } from "../apiClint";

export function addPassword(data) {
  return axiosClient.get("/api/Account/ForgotPassword", JSON.stringify(data));
}
