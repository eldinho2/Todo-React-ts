import { useState } from "react";
import InsertTask from "./components/InsertTask";
import { Todo } from "./Types/Todo";
import "./styles/App.css";
import Task from "./components/Task";
import ChoresDone from "./components/ChoresDone";
import { addTask, useTask } from "./redux/sliceTask";
import { useSelector, useDispatch } from "react-redux";
import { add } from "date-fns";

function App() {
  const state = useSelector(useTask);

  const dispatch = useDispatch();

  const tasks = state.tasks;

  return (
    <div className="App">
      <div>
        <h1>Todo List</h1>
      </div>
      <InsertTask />
      <div className="todo-list-container">
        {!tasks.length ? (
          <p className="no-tasks">No tasks</p>
        ) : (
          tasks.map((todo: any) => {
            return (
              <Task
                key={todo.title}
                title={todo.title}
                description={todo.description}
                date={todo.date}
                done={false}
              />
            );
          })
        )}
      </div>
      <div className="chore-list-container">
          <ChoresDone />
        </div>
    </div>
  );
}

export default App;
