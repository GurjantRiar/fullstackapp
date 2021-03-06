import { SET_ALERT, REMOVE_ALERT } from "../Actions/types";

const intialState = [];
//   {
//     id: 1,
//     msg: "Please log in",
//     alertType: "Success",
//   },
export default function (state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
