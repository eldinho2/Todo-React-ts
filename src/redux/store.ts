import { configureStore } from "@reduxjs/toolkit";
import sliceTasks from "./sliceTask";

const store = configureStore({
  reducer: {
    task: sliceTasks,
  },
});

export default store;