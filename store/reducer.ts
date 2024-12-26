import {
  Action,
  DashboardReducer,
  SET_FIREBASE_DATA,
  SET_FIREBASE_ERROR,
  SET_FIREBASE_LOADING,
  SET_FIREBASE_SIMULATOR_DATA,
  SET_FIREBASE_SIMULATOR_ERROR,
  SET_FIREBASE_SIMULATOR_LOADING,
} from "./types";

export const initialState: DashboardReducer = {
  isFirebaseLoading: false,
  isFirebaseSimulatorLoading: false,
  firebaseUsers: [],
  firebaseSimulatorUsers: [],
  firebaseError: "",
  firebaseSimulatorError: "",
};

export const dashboardReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_FIREBASE_LOADING:
      return { ...state, isFirebaseLoading: action.payload.isLoading };
    case SET_FIREBASE_SIMULATOR_LOADING:
      return { ...state, isFirebaseSimulatorLoading: action.payload.isLoading };
    case SET_FIREBASE_DATA:
      return { ...state, firebaseUsers: action.payload.user };
    case SET_FIREBASE_SIMULATOR_DATA:
      return { ...state, firebaseSimulatorUsers: action.payload.user };
    case SET_FIREBASE_ERROR:
      return { ...state, firebaseError: action.payload.error };
    case SET_FIREBASE_SIMULATOR_ERROR:
      return { ...state, firebaseSimulatorError: action.payload.error };
    default:
      return state;
  }
};
