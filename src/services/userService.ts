import { query, createQueryBody } from "./graphqlService";

const getMeBaseQueryBody = `
mutation getMe {
    getMe { 
  $output
}}`;

export type UserDto = {
  id: string;
  telegramId: string;
  userName?: string;
  fullName: string;
  avatar?: string;
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
        createdAt: true,
        updatedAt: true,
      }),
      null
    );
    return res as UserDto;
  }
}

export const userService = new UserService();
