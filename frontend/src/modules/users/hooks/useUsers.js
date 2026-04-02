import { useCallback, useState } from "react";
import usersService from "../../../services/users";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loadUsers = useCallback(async function loadUsers() {
    setIsLoading(true);
    setError("");

    try {
      const response = await usersService.getUsers();
      setUsers(response.data.users);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function updateUser(userId, payload) {
    const response = await usersService.updateUser(userId, payload);
    await loadUsers();
    return response;
  }

  return {
    users,
    isLoading,
    error,
    loadUsers,
    updateUser,
  };
}
