import { axiosClient } from "../apiClint";

export function getSearchLogs() {
  return axiosClient.get(`/api/SearchLogs`);
}
export function getSearchLogsById(id) {
  return axiosClient.get(`/api/SearchLogs/${id}`);
}
export function deleteSearchLogs(id) {
  return axiosClient.delete(`/api/SearchLogs/${id}`);
}
