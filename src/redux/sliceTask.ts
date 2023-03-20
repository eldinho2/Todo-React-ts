import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  title: string;
  description: string | number | undefined;
  date: string[] | string;
  done: boolean;
}

const INITIAL_STATE = {
  tasks: [
    {
      title: "Task 1",
      description: "Description 1",
      date: [
        "2021-01-01",
        "2021-01-02"
      ],
      done: false,
    }
  ]as Todo[] ,
  completedTasks: [
    {
      title: "Task COMPLETED",
      description: "Description COMPLETED",
      date: [
        "2021-01-01",
        "2021-01-02"
      ],
      done: true,
    }
  ] as Todo[],
}


const sliceTask = createSlice({
  name: "task",
  initialState: INITIAL_STATE,
  reducers: {
    addTask: (state, action: PayloadAction<Todo>) => {
      state.completedTasks = state.completedTasks.filter((task) => task.title  !== action.payload.title);
      state.tasks.push(action.payload);
    },
    addCompletedTask: (state, action: PayloadAction<Todo>) => {
      state.tasks = state.tasks.filter((task) => task.title !== action.payload.title);
      state.completedTasks.push(action.payload);
    },
    delTask: (state, action) => {
      console.log(action.payload);
      state.tasks = state.tasks.filter((task) => task.title !== action.payload.title);
      state.completedTasks = state.completedTasks.filter((task) => task.title !== action.payload.title);
    },
  },
})

export default sliceTask.reducer;
export const { addTask, addCompletedTask, delTask } = sliceTask.actions;

export const useTask = (state: any) => {
  return state.task;
}

