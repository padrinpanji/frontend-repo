import {
  SET_FIREBASE_LOADING,
  SET_FIREBASE_SIMULATOR_LOADING,
  SET_FIREBASE_DATA,
  SET_FIREBASE_SIMULATOR_DATA,
  Action,
  UserData,
  SET_FIREBASE_ERROR,
  SET_FIREBASE_SIMULATOR_ERROR,
} from "./types";

export const setFirebaseLoading = (isLoading: boolean): Action => ({
  type: SET_FIREBASE_LOADING,
  payload: {
    isLoading: isLoading,
  },
});

export const setFirebaseSimulatorLoading = (isLoading: boolean): Action => ({
  type: SET_FIREBASE_SIMULATOR_LOADING,
  payload: {
    isLoading: isLoading,
  },
});

export const setFirebaseData = (user: UserData[]): Action => ({
  type: SET_FIREBASE_DATA,
  payload: {
    user: user,
  },
});

export const setFirebaseSimulatorData = (user: UserData[]): Action => ({
  type: SET_FIREBASE_SIMULATOR_DATA,
  payload: {
    user: user,
  },
});

export const setFirebaseError = (error: string): Action => ({
  type: SET_FIREBASE_ERROR,
  payload: {
    error: error,
  },
});

export const setFirebaseSimulatorError = (error: string): Action => ({
  type: SET_FIREBASE_SIMULATOR_ERROR,
  payload: {
    error: error,
  },
});
