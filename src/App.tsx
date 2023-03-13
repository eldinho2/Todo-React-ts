import { useState } from 'react'
import DayInput from './components/DayInput'
import InsertTask from './components/InsertTask'
import { Todo } from "./Types/Todo"
import './styles/App.css'
import Task from './components/Task'
import { Description } from '@radix-ui/react-alert-dialog'

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([
    {
      title: "Teste",
      description: "DESCRIÇAOQUALQUER",
      date: [
          "13/03/2023",
          "21/03/2023",
          "22/03/2023"
      ],
      done: false
  }
  ])

  const LocalStorageArray = JSON.parse(localStorage.getItem('TodoList'));
  console.log(LocalStorageArray);
  

  return (
    <div className="App">
      <div>
        <h1>Todo List</h1>
      </div>
      <InsertTask setTodoList={setTodoList} />
      <main className='todo-list-container'>
        {localStorage.length < 1 ? todoList.map((todo:Todo) => {
          return (
            <Task title={todo.title} description={todo.description} date={todo.date} done={todo.done} />
          )
        }) : [LocalStorageArray].map((todo:Todo) => {
          return (
            <Task title={todo.title} description={todo.description} date={todo.date} done={todo.done} />
          )
        })
        }
      </main>
    </div>
  )
}

export default App
