// userService.js
import API from "'./js/api.js'";

const api = new API("http://easyrentapi0.runasp.net", {
  accept: "*/*",
  apiKey: "your-api-key",
  authToken: "your-access-token",
});

export const fetchUsers = () => api.get("/users");
export const createUser = (userData) => api.post("/users", userData);
export const updateUser = (id, userData) => api.put(/users/`${id}`, userData);
export const deleteUser = (id) => api.delete(/users/`${id}`);
