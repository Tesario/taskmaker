import { Tasks } from "../../components/Tasks/TaskList/TaskList";
import { ActionType } from "../action-types/index";
import { Action } from "../actions";

const reducer = (state: Tasks["tasks"] = null, action: Action) => {
  switch (action.type) {
    case ActionType.ADDTASK:
      if (state === null) return (state = null);
      return [...state, action.payload];
    case ActionType.SETTASKS:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
