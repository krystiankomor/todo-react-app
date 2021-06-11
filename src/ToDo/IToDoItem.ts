export interface IToDoItem {
  name: string;
  done: boolean;
  deadline: Date | null;
  id: string;
}