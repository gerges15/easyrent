import { axiosClient } from "../apiClint";

export function addNewUnit(data) {
  return axiosClient.post(`/api/Unit`, JSON.stringify(data));
}
export function getAllUnits() {
  return axiosClient.get(`/api/Unit/GetAllUnits`);
}
export function getUnit(id) {
  return axiosClient.get(`/api/Unit/${id}`);
}
export function uploadUnitPhoto(unitId) {
  return axiosClient.post(`/api/Unit/${unitId}/upload-photos`);
}
export function uploadPhotos() {
  return axiosClient.post(`/api/Unit/upload-photos`);
}
export function approveUnit(unitId) {
  return axiosClient.put(`/api/Unit/ApproveUnit/${unitId}`);
}
export function deleteUnit(unitId) {
  return axiosClient.delete(`/api/Unit/${unitId}`);
}
