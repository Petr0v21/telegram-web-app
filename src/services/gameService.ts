import { query, createQueryBody, SuccessOutput } from "./graphqlService";
import { UserDto } from "./userService";

const playBaseQueryBody = `
mutation play (
  $bet: Float!
) {
play(
    bet: $bet, 
) { 
  $output
}}`;

const getHistoryBaseQueryBody = `
mutation getHistory (
  $take: Float,
  $skip: Float,
) {
    getHistory(
    take: $take, 
    skip: $skip,
) { 
  $output
}}`;

export type MutationPlayArgs = {
  bet: number;
};

export type QueryGetHistoryArgs = {
  take: number;
  skip: number;
};

export type Game = {
  id: string;
  isWin: boolean;
  bet: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  User: UserDto;
};

export class GameService {
  async play(data: MutationPlayArgs) {
    console.log("data", data);
    const res = await query(
      createQueryBody(playBaseQueryBody, {
        success: true,
      }),
      data
    );
    console.log("res", res);

    return res as SuccessOutput;
  }

  async getHistory(data: QueryGetHistoryArgs) {
    const res = await query(
      createQueryBody(getHistoryBaseQueryBody, {
        id: true,
        isWin: true,
        bet: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      }),
      data
    );
    return res as Game[];
  }
}

export const gameService = new GameService();
