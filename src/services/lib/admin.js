import { axiosClient } from "../apiClint";

export function addAdminPassword(id) {
  return axiosClient.post(`/api/Admin/encrypt-password/${id}`, "");
}

export function addAdminLogin(data) {
  return axiosClient.post("/api/Admin/login", JSON.stringify(data));
}

export function getAllAdmins() {
  return axiosClient.get("/api/Admin");
}
export function getAdminById(id) {
  return axiosClient.get(`/api/Admin/${id}`);
}

export function updateAdmin(id, data) {
  return axiosClient.put(`/api/Admin/${id}`, JSON.stringify(data));
}
export function deleteAdmin(id) {
  return axiosClient.delete(`/api/Admin/${id}`);
}
