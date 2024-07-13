import { useMachine } from "@xstate/react";
import { assign } from "xstate";
import { useEffect } from "react";
import authenticationMachine, {
  AuthenticationMachineEvent,
} from "../hooks/authenticationMachine";

const AuthenticationComponent: React.FC = () => {
  const [state, send] = useMachine(authenticationMachine, {
    services: {
      checkIfLoggedIn: async () => {
        const isLoggedIn = await fakeAuthCheck();
        console.log({ isLoggedIn });
        if (isLoggedIn) {
          send({
            type: "REPORT_IS_LOGGED_IN",
            userDetails: {
              username: "mpocock1",
            },
          });
        } else {
          send({
            type: "REPORT_IS_LOGGED_OUT",
          });
        }
      },
    },
    actions: {
      navigateToAuthPage: () => {
        console.log("got to login");
      },
      assignUserDetailsToContext: assign(
        (_, event: AuthenticationMachineEvent) => {
          if (event.type === "REPORT_IS_LOGGED_IN" || event.type === "LOG_IN") {
            return {
              userDetails: event.userDetails,
            };
          }
          return {};
        }
      ),
      clearUserDetailsFromContext: assign({
        userDetails: undefined,
      }),
    },
  });

  useEffect(() => {
    console.log("Current state:", state.value);
  }, [state]);

  return (
    <div>
      <h1>Authentication Status: {state.value as string}</h1>
      {state.matches("loggedIn") && (
        <div>
          <p>Welcome, {state.context.userDetails?.username}!</p>
          <button onClick={() => send({ type: "LOG_OUT" })}>Log Out</button>
        </div>
      )}
      {state.matches("loggedOut") && (
        <button
          onClick={() =>
            send({ type: "LOG_IN", userDetails: { username: "mpocock1" } })
          }
        >
          Log In
        </button>
      )}
    </div>
  );
};

const fakeAuthCheck = (): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random() > 0.5);
    }, 1000);
  });
};

export default AuthenticationComponent;
