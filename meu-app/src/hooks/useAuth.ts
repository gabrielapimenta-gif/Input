import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/user";

const USER_KEY = "@user";

export async function saveUser(user: User) {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function getUser(): Promise<User | null> {
  const user = await AsyncStorage.getItem(USER_KEY);

  if (!user) return null;

  return JSON.parse(user);
}

export async function logout() {
  await AsyncStorage.removeItem(USER_KEY);
}