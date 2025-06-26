import { axiosClient } from "../apiClint";

export function addNewOwner(data) {
  return axiosClient.post(`/api/Owner/register`, JSON.stringify(data));
}

export function loginOwner(data) {
  return axiosClient.post("/api/Owner/login", JSON.stringify(data));
}

export function getOwnerById(id) {
  return axiosClient.get(`/api/Owner/${id}`);
}

export function deleteOwner(id) {
  return axiosClient.delete(`/api/Owner/${id}`);
}

export function updateOwner(id, data) {
  return axiosClient.put(`/api/Owner/${id}`, JSON.stringify(data));
}
