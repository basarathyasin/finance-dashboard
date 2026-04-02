import api from "./api";

const usersService = {
  getUsers() {
    return api.get("/users");
  },
  updateUser(userId, payload) {
    return api.patch(`/users/${userId}`, payload);
  },
};

export default usersService;
