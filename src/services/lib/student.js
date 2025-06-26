import { axiosClient } from "../apiClint";

export function registerStudent(data) {
  return axiosClient.post(`/api/Student/register`, JSON.stringify(data));
}
export function loginStudent(data) {
  return axiosClient.post(`/api/Student/login`, JSON.stringify(data));
}
export function getStudent(id) {
  return axiosClient.get(`/api/Student/${id}`);
}
export function deleteStudent(id) {
  return axiosClient.delete(`/api/Student/${id}`);
}
