import { axiosClient } from "../apiClint";

export function getAllUniversities() {
  return axiosClient.get(`/api/University`);
}

export function addNewUniversity(data) {
  return axiosClient.post(`/api/University`, JSON.stringify(data));
}

export function updateUniversity(id, data) {
  return axiosClient.put(`/api/University/${id}`, JSON.stringify(data));
}

export function deleteUniversity(id) {
  return axiosClient.delete(`/api/University/${id}`);
}
