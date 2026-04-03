import api from "./api";

const usersService = {
  createUser(payload) {
    return api.post("/users", payload);
  },
  getUsers() {
    return api.get("/users");
  },
  updateUser(userId, payload) {
    return api.patch(`/users/${userId}`, payload);
  },
};

export default usersService;
