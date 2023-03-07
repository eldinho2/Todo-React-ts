import { useState } from 'react'
import DayInput from './components/DayInput'
import InsertTask from './components/InsertTask'
import { Todo } from "./Types/Todo"
import './styles/App.css'

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([])

  return (
    <div className="App">
      <div>
        <h1>Todo List</h1>
      </div>
      <InsertTask setTodoList={setTodoList} />
      <main className='todo-list-container'>
        {todoList.map((todo:Todo) => {
          return (
            <ul>
              <li key={todo.description} >
                <h2>{todo.title}</h2>
                <p>{todo.description}</p>
                <p>{todo.date.toString()}</p>
              </li>
            </ul>
          )
        })}
      </main>
    </div>
  )
}

export default App
