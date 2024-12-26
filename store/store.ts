import { useReducer } from "react";
import { dashboardReducer, initialState } from "./reducer";

const useDashboardStore = () => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  return { state, dispatch };
};

export default useDashboardStore;
