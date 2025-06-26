import { axiosClient } from "../apiClint";

export function getAllAmenities() {
  return axiosClient.get(`/api/Amenities`);
}

export function addAmenities(data) {
  return axiosClient.post(`/api/Amenities`, JSON.stringify(data));
}

export function getAmenities(id) {
  return axiosClient.get(`/api/Amenities/${id}`);
}

export function updateAmenities(id, data) {
  return axiosClient.put(`/api/Amenities/${id}`, JSON.stringify(data));
}
export function deleteAmenities(id) {
  return axiosClient.delete(`/api/Amenities/${id}`);
}
