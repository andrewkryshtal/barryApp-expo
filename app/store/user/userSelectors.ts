import { RootState } from "..";

export const isLoggedInSelector = (state: RootState) =>
  state.user.token !== null;
