import { createMachine } from "xstate";

const toggleMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2UoBswDoCWAdgIYDGyeAbmAMQAqA8gOKMAyAogNoAMAuoqAAdUsPOVQF+IAB6IAjAFYAHDgBMXAMyyV8gDQgAnnPUqAvib1oM2HKXJU6TVp16ShIsRKTS5S1Rq26BoiKsjjyZuYgBKgQcJKWWGCuwqJ44pIyCAC0AGx6htk5ZhboifjEZJRJXm6p6V6ZACwq+cEA7GGK6t09vd3FIAnWtlXJ7mmeoJkqiiphrQgAnFw4XF19GxEmQA */
  id: "toggle",
  initial: "inactive",
  states: {
    inactive: {
      on: { TOGGLE: "active" },
    },
    active: {
      on: { TOGGLE: "inactive" },
    },
  },
});

export default toggleMachine;
