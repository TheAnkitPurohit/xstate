import { useMachine } from "@xstate/react";
import toggleMachine from "../hooks/toggleMachine";

const Toggler = () => {
  const [state, send] = useMachine(toggleMachine);

  return (
    <button onClick={() => send({ type: "TOGGLE" })}>
      {state.value === "inactive"
        ? "Click to activate"
        : "Active! Click to deactivate"}
    </button>
  );
};

export default Toggler;
