import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions/index";
import { Task, Tasks } from "../../components/Tasks/TaskList/TaskList";

export const addTask = (amount: Task) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ADDTASK,
      payload: amount,
    });
  };
};

export const setTasks = (amount: Tasks["tasks"]) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SETTASKS,
      payload: amount,
    });
  };
};
