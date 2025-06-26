import { axiosClient } from "../apiClint";

export function newBookUnit(data) {
  axiosClient.post(`/api/Booking/BookUnit`, JSON.stringify(data));
}

export function getAllBookUnits() {
  axiosClient.get(`/api/Booking/GetAllBookings`);
}

export function getStudentBookUnits(id) {
  axiosClient.get(`/api/Booking/StudentBookings/${id}`);
}
export function deleteBookUnits(id) {
  axiosClient.get(`/api/Booking/DeleteBooking/${id}`);
}
