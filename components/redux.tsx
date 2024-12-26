"use client";

import { increment, decrement, reset } from "store/action";
import useCounterStore from "store/store";

const Redux = () => {
  const { state, dispatch } = useCounterStore();

  return (
    <div>
      <h1>Count: {state.count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
};

export default Redux;
