// store/useCounterStore.js
import { useReducer } from "react";
import { counterReducer, initialState } from "./reducer";

// Custom hook to use counter store
const useCounterStore = () => {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return { state, dispatch };
};

export default useCounterStore;
