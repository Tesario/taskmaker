import { ActionType } from "../action-types/index";
import { Task, Tasks } from "../../components/Tasks/TaskList/TaskList";

interface AddTask {
  type: ActionType.ADDTASK;
  payload: Task;
}

interface SetTasks {
  type: ActionType.SETTASKS;
  payload: Tasks["tasks"];
}

export type Action = AddTask | SetTasks;
