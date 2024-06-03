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
          ? `${this.getTelegramPayload()}`
          : "",
      },
    });
  }

  private setPayload() {
    if (process.env.NODE_ENV === "development") {
      this.telegramPayload =
        "query_id=AAEt0wsuAAAAAC3TCy57y92c&user=%7B%22id%22%3A772526893%2C%22first_name%22%3A%22%D0%92%D1%8F%D1%87%D0%B5%D1%81%D0%BB%D0%B0%D0%B2%22%2C%22last_name%22%3A%22%D0%9F%D0%B5%D1%82%D1%80%D0%BE%D0%B2%22%2C%22username%22%3A%22petr0v_21%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1717342017&hash=65300f9c83d0c98fbd468e81cf6e8015f5ecf4609052ec574f5c2ac656841b1b";
      return;
    }
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
      return null;
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
