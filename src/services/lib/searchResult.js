import { axiosClient } from "../apiClint";

export function getSearchResults() {
  return axiosClient.get(`/api/SearchResults`);
}
export function getSearchResultsById(id) {
  return axiosClient.get(`/api/SearchResults/${id}`);
}
export function deleteSearchResultsById(id) {
  return axiosClient.delete(`/api/SearchResults/${id}`);
}
export function getSearchResBySearchLog(searchLogId) {
  return axiosClient.get(`/api/SearchResults/by-searchlog/${searchLogId}`);
}
