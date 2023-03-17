import React, { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Todo } from '../Types/Todo';
import {addCompletedTask, addTask, useTask}  from '../redux/sliceTask'
import { useSelector, useDispatch } from 'react-redux'
import '../styles/Task.css';

const Task = ({title, description, date, done}: Todo) => {
  const [isChecked, setIsChecked] = useState(false);

  const AccordionTrigger = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="AccordionHeader">
      <Accordion.Trigger
        className={'AccordionTrigger'}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <ChevronDownIcon className="AccordionChevron" aria-hidden />
      </Accordion.Trigger>
    </Accordion.Header>
  ));
  
  const AccordionContent = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
      className={'AccordionContent'}
      {...props}
      ref={forwardedRef}
    >
      <div className="AccordionContentText">{children}</div>
    </Accordion.Content>
  ));

  const dispatch = useDispatch();

  const state = useSelector(useTask);

  const tasks = state.completedTasks;

  const handleClick = (e) => {
    e.stopPropagation();
    setIsChecked(!isChecked);
    console.log(tasks)
    if (done) {
      dispatch(addTask({title, description, date, done: false}))
    } else {
      dispatch(addCompletedTask({title, description, date, done: true}))
    }
  }

  return (
  <Accordion.Root className="AccordionRoot" type="single" collapsible>
    <Accordion.Item className="AccordionItem" value="item-1">
      <AccordionTrigger>{<input type={'checkbox'} checked={done} onClick={handleClick} ></input>}{title}</AccordionTrigger>
      <AccordionContent><div className='taskDescription'>{description}</div><div title={date} className='taskDate'>{`de ${date[0]} ate ${date[date.length - 1]}`}</div></AccordionContent>
    </Accordion.Item>
  </Accordion.Root>
  )
}


export default Task;