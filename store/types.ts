export const SET_FIREBASE_LOADING = "SET_FIREBASE_LOADING";
export const SET_FIREBASE_SIMULATOR_LOADING = "SET_FIREBASE_SIMULATOR_LOADING";

export const SET_FIREBASE_DATA = "SET_FIREBASE_DATA";
export const SET_FIREBASE_SIMULATOR_DATA = "SET_FIREBASE_SIMULATOR_DATA";

export const SET_FIREBASE_ERROR = "SET_FIREBASE_ERROR";
export const SET_FIREBASE_SIMULATOR_ERROR = "SET_FIREBASE_SIMULATOR_ERROR";

export type User = { name: string; email: string };

export type Action = {
  type:
    | typeof SET_FIREBASE_LOADING
    | typeof SET_FIREBASE_SIMULATOR_LOADING
    | typeof SET_FIREBASE_DATA
    | typeof SET_FIREBASE_SIMULATOR_DATA
    | typeof SET_FIREBASE_ERROR
    | typeof SET_FIREBASE_SIMULATOR_ERROR;
  payload: {
    isLoading?: boolean;
    user?: User[];
    error?: string;
  };
};

export type DashboardReducer = {
  isFirebaseLoading?: boolean;
  isFirebaseSimulatorLoading?: boolean;
  firebaseUsers?: User[];
  firebaseSimulatorUsers?: User[];
  firebaseError?: string;
  firebaseSimulatorError?: string;
};

export type UserData = {
  email: string;
  name: string;
};
