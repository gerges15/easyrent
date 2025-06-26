import { axiosClient } from "../apiClint";

export function getAllColleges() {
  return axiosClient.get(`/api/Colleges`);
}

export function addNewCollege(data) {
  return axiosClient.post(`/api/Colleges`, JSON.stringify(data));
}

export function getCollegeById(id) {
  return axiosClient.get(`/api/Colleges/${id}`);
}
export function updateCollege(id) {
  return axiosClient.put(`/api/Colleges/${id}`);
}
export function deleteCollege(id) {
  return axiosClient.delete(`/api/Colleges/${id}`);
}
