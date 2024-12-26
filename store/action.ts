// Action Types
export const INCREMENT = "increment";
export const DECREMENT = "decrement";
export const RESET = "reset";

// Action Creators
export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});

export const reset = () => ({
  type: RESET,
});
