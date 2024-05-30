import { GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_BACK_URL ?? "";

export class GraphQLService {
  public graphQLClient: GraphQLClient;

  private accessToken: string = "";
  private refreshToken: string = "";

  constructor() {
    this.setTokens();

    this.graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: this.getAccessToken()
          ? `Bearer ${this.getAccessToken()}`
          : "",
      },
    });
  }

  private setTokens() {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const tokensString = localStorage.getItem("tokens");
        if (tokensString && tokensString !== "undefined") {
          const tokens: any = JSON.parse(tokensString);
          this.accessToken = tokens.accessToken;
          this.refreshToken = tokens.refreshToken;
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  public getAccessToken() {
    return this.accessToken;
  }

  public getRefreshToken() {
    return this.refreshToken;
  }

  public refreshClient() {
    this.setTokens();
    this.graphQLClient.setHeader(
      "Authorization",
      this.getAccessToken() ? `Bearer ${this.getAccessToken()}` : ""
    );
  }
}

export const gql = new GraphQLService();
