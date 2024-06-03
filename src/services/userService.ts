import { query, createQueryBody } from "./graphqlService";

const getMeBaseQueryBody = `
query getMe {
    getMe { 
  $output
}}`;

export type User = {
  id: string;
  telegramId: string;
  userName?: string;
  fullName: string;
  avatar?: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
};

export class UserService {
  async getMe() {
    const res = await query(
      createQueryBody(getMeBaseQueryBody, {
        id: true,
        telegramId: true,
        userName: true,
        fullName: true,
        avatar: true,
        balance: true,
        createdAt: true,
        updatedAt: true,
      }),
      null
    );
    return res as User;
  }
}

export const userService = new UserService();
