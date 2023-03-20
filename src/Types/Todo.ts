export interface Todo {
  title: string;
  description: string | undefined;
  date: string[] | Array<string>;
  done: boolean;
}
