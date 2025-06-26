import { axiosClient } from "../apiClint";

export function addNewFeedback(data) {
  return axiosClient.post(`/api/Feedback`, JSON.stringify(data));
}

export function getAllFeedback() {
  return axiosClient.get(`/api/Feedback`);
}

export function updateFeedback(id, data) {
  return axiosClient.put(`/api/Feedback/${id}`, JSON.stringify(data));
}

export function getFeedbackById(id) {
  return axiosClient.get(`/api/Feedback/${id}`);
}
export function deleteFeedback(id) {
  return axiosClient.delete(`/api/Feedback/${id}`);
}
