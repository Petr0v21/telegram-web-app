import { query, createQueryBody, SuccessOutput } from "./graphqlService";
import { User } from "./userService";

const playBaseQueryBody = `
mutation play (
  $bet: Float!,
  $side: CoinSide!
) {
play(
    bet: $bet,
    side: $side, 
) { 
  $output
}}`;

const getHistoryBaseQueryBody = `
query getHistory (
  $take: Float,
  $skip: Float,
) {
    getHistory(
    take: $take, 
    skip: $skip,
) { 
  $output
}}`;

export enum CoinSide {
  HEADS = "HEADS",
  TAILS = "TAILS",
}

export type MutationPlayArgs = {
  bet: number;
  side: CoinSide;
};

export type QueryGetHistoryArgs = {
  take?: number;
  skip?: number;
};

export type Game = {
  id: string;
  isWin: boolean;
  bet: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  User: User;
};

export class GameService {
  async play(data: MutationPlayArgs) {
    const res = await query(
      createQueryBody(playBaseQueryBody, {
        success: true,
      }),
      data
    );
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
        User: {
          id: true,
          userName: true,
          fullName: true,
          avatar: true,
        },
      }),
      data
    );
    return res as Game[];
  }
}

export const gameService = new GameService();
