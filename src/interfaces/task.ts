import { STATUS } from "../enums";

export interface ITask {
  title: string;
  description: string;
  status: STATUS;
  index: number
}
