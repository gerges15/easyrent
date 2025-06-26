import { axiosClient } from "../apiClint";

export function getAllStudentUnits() {
  return axiosClient.get(`/api/StudentUnits`);
}
export function deleteAllStudentUnits() {
  return axiosClient.delete(`/api/StudentUnits`);
}
export function getStudentUnits(studentId) {
  return axiosClient.get(`/api/StudentUnits/student/${studentId}`);
}
export function getUnitStudentUnits(unitId) {
  return axiosClient.get(`/api/StudentUnits/unit/${unitId}`);
}
export function assignStudentUnit(data) {
  return axiosClient.post(`/api/StudentUnits/Assign`, JSON.stringify(data));
}
