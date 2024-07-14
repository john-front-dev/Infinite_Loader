import axios from "axios";
import { User } from "../types/types";

const BASE_URL = "http://localhost:3000";

export const getUsers = async (start = 0, limit = 10): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${BASE_URL}/users`, {
      params: {
        _start: start,
        _limit: limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Произошла ошибка при загрузке пользователей:", error);
    throw error;
  }
};

export const createUser = async (userData: Omit<User, "id">): Promise<User> => {
  try {
    const response = await axios.post<User>(`${BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error("Произошла ошибка при создании пользователя:", error);
    throw error;
  }
};