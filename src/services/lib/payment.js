import { axiosClient } from "../apiClint";

export function addNewPayment(data) {
  return axiosClient.post(`/api/Payment`, JSON.stringify(data));
}
export function getPayment(id) {
  return axiosClient.get(`/api/Payment/${id}`);
}
export function getPaymentBooking(bookingId) {
  return axiosClient.get(`/api/Payment/Booking/${bookingId}`);
}
