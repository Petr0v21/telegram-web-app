import { GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_BACK_URL ?? "";

export class GraphQLService {
  public graphQLClient: GraphQLClient;

  private telegramPayload: string = "";

  constructor() {
    this.setPayload();

    this.graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        "key-token": this.getTelegramPayload()
          ? `Bearer ${this.getTelegramPayload()}`
          : "",
      },
    });
  }

  private setPayload() {
    if (typeof window !== "undefined" && (window as any).Telegram.WebApp) {
      try {
        const tokensString = (window as any).Telegram.WebApp.initData;
        if (tokensString && tokensString !== "undefined") {
          this.telegramPayload = tokensString;
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  public getTelegramPayload() {
    return this.telegramPayload;
  }

  public refreshClient() {
    this.setPayload();
    this.graphQLClient.setHeader(
      "key-token",
      this.getTelegramPayload() ? this.getTelegramPayload() : ""
    );
  }
}

export const gql = new GraphQLService();

export const query = async (queryBody: any, data: any) => {
  return await gql.graphQLClient
    .request(queryBody, data)
    .then((res: any) => Object.values(res)[0])
    .catch((error) => {
      return error;
    });
};

export const createQueryBody = (
  baseQueryBody: string,
  args: Record<string, boolean | Record<string, boolean>>
) => {
  const outputStr = Object.entries(args).reduce((str, [key, value]) => {
    if (value) {
      if (typeof value === "object") {
        const outputStrSec = Object.entries(value).reduce(
          (str_sec, [key, value]) => {
            if (value) {
              return str_sec.concat(key + " ");
            } else {
              return str_sec;
            }
          },
          ""
        );
        return str.concat(key + " {" + outputStrSec + "}" + " ");
      }
      return str.concat(key + " ");
    } else {
      return str;
    }
  }, "");
  return baseQueryBody.replace("$output", outputStr);
};

export type SuccessOutput = {
  success: boolean;
};
