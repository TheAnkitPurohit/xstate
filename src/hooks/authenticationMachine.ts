import { createMachine } from "xstate";

// Types
export interface UserDetails {
  username: string;
}

export interface AuthenticationMachineContext {
  userDetails?: UserDetails;
}

export type AuthenticationMachineEvent =
  | { type: "REPORT_IS_LOGGED_IN"; userDetails: UserDetails }
  | { type: "REPORT_IS_LOGGED_OUT" }
  | { type: "LOG_OUT" }
  | { type: "LOG_IN"; userDetails: UserDetails };

// Machine definition
const authenticationMachine = createMachine<
  AuthenticationMachineContext,
  AuthenticationMachineEvent
>({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFmAduglgMbIED2OAdIdoQNb45QCSAZgDKlQwRM4DEYAE6DSgigAcANiRaiAthTRZcBYmUrUwdBs3aduvBAwBupNfnIBtAAwBdG7cShxpWPnVOQAD0QAmAOwAbBS+AIzWAJwAzL5RAKyBAQAcvnEANCAAnoihcXEUgQAsMYWhgVH+qXGhAL41GUrYeEQkFho09IysHFyQvHwASgCiAAoA8gMAKgD6TADK02xjAOLLQwAiswByDp4ubh5I3n5BIeHRsQnJqRnZCAH5lYFx-lERcYURn4WBdQ0YTVUrXIVA6Om6+j6-GG4ymswWS1WG2mYwAqpNdkd9u42p4fPdTmFIjF4ol-Cl0lkctZ8qFir5CkkIgyoik6X8QI0VC11BRJJCePxESj0ZjnK4ceQ8YgvhEKKVCjSinEmRFAqFbogkqEKHFrPrQvFfL5rAyfhyuc1zCD+b0IGMMHxhUwdnY9hLDqB8UlWRQIkE8okItZGe9NQhDb4KPqY4koqH-MU6vUQDhSBA4J5LUDPSBsbn8QBaQLhwv5CIVytVyv+CIWgHc63tLSdXQ9Aw4d0HXFHfGFXzhw06ukkgLRfspQr15RW4GUW0druSzu96nMigVT5fQr+UKhE1JcO+Jm68mGlVxf1qw3TwE8tp8gUO9BLguIOK+YKJsIpCvqpJJP44YREkFBPHkFT+CqgRfMmNRAA */
  id: "authentication",
  initial: "checkingIfLoggedIn",
  states: {
    checkingIfLoggedIn: {
      invoke: {
        src: "checkIfLoggedIn",
        onError: {
          target: "loggedOut",
        },
      },
      on: {
        REPORT_IS_LOGGED_IN: {
          target: "loggedIn",
          actions: "assignUserDetailsToContext",
        },
        REPORT_IS_LOGGED_OUT: "loggedOut",
      },
    },
    loggedIn: {
      on: {
        LOG_OUT: {
          target: "loggedOut",
        },
      },
    },
    loggedOut: {
      entry: ["navigateToAuthPage", "clearUserDetailsFromContext"],
      on: {
        LOG_IN: {
          target: "loggedIn",
          actions: "assignUserDetailsToContext",
        },
      },
    },
  },
});

export default authenticationMachine;
