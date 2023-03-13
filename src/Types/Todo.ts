export interface Todo {
  title: string;
  description: string | number | undefined;
  date: string[] | Array<string>;
  done: boolean;
}
