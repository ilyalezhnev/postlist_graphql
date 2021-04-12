import { InMemoryCache, makeVar } from "@apollo/client";
import { AUTH_TOKEN_KEY } from "../common/const";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isUserLoggedIn: {
          read() {
            return isUserLoggedInVar();
          },
        },
      },
    },
  },
});

const isLoggedIn = () => localStorage.getItem(AUTH_TOKEN_KEY);
const isUserLoggedInVar = makeVar(isLoggedIn());
