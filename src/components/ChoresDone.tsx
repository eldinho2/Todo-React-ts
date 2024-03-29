import {Children, useState} from "react";
import { addTask, useTask } from '../redux/sliceTask'
import { useSelector, useDispatch } from 'react-redux'
import Task from '../components/Task'
import { Todo } from '../Types/Todo'
import "../styles/Task.css";

const ChoresDone = () => {
  const [isOpen, setIsOpen] = useState(false);

  const state = useSelector(useTask);

  const dispatch = useDispatch();

  const completedTasks = state.completedTasks;

  const handleOpen = (event: any) => {
    setIsOpen(!isOpen);
    const element = event.currentTarget;
    const currentState = element.getAttribute('data-state');
    const newState = currentState === 'true' ? 'false' : 'true';
    element.setAttribute('data-state', newState);
    const svg = element.querySelector('svg');
    if (svg) {
      svg.setAttribute('data-state', newState);
    } 
  }


  return (
    <>
    <div className="ChoresDone" data-state='false' onClick={handleOpen}>
      <div className="ChoresDoneBtn">
        <svg className="arrowDone" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor"></path>
        </svg>
        <button  onClick={handleOpen}>Concluidos {completedTasks.length}      
        </button>
      </div>
    </div>
    {
      isOpen && (
        <div className="ChoresDone">
          {completedTasks.map((todo: Todo) => {
            return (
              <Task key={todo.title} title={todo.title} description={todo.description} date={todo.date} done={true}/>
            )
          })}
        </div>
      )
    }
  </>
  )
}
  

export default ChoresDone;
