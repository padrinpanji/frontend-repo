export const SET_USER = "SET_USER";
export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";
export const SET_LOADING = "SET_LOADING";

export type User = { name: string; email: string };

export type Action =
  | { type: typeof SET_USER; payload: User }
  | { type: typeof LOGOUT }
  | { type: typeof SET_LOADING; payload: boolean };
