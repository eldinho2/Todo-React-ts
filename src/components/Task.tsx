import React, { Children, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Todo } from "../Types/Todo";
import {
  addCompletedTask,
  addTask,
  useTask,
  delTask,
} from "../redux/sliceTask";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Task.css";

const Task = ({ title, description, date, done }: Todo) => {
  const [isChecked, setIsChecked] = useState(false);

  const AccordionTrigger = React.forwardRef(
    ({ children, className, ...props }: any, forwardedRef) => (
      <Accordion.Header className="AccordionHeader">
        <Accordion.Trigger
          className={"AccordionTrigger"}
          {...props}
          ref={forwardedRef}
        >
          {children}
          {console.log(children)}
          {
            children[0]._owner.pendingProps.description === '' && children[0]._owner.pendingProps.date.length < 1 ? (<div></div>) : (
              <ChevronDownIcon className="AccordionChevron" aria-hidden />
            )
          }
        </Accordion.Trigger>
      </Accordion.Header>
    )
  );

  const AccordionContent = React.forwardRef(
    ({ children, className, ...props }: any, forwardedRef) => (
      <Accordion.Content
        className={"AccordionContent"}
        {...props}
        ref={forwardedRef}
      >
        <div className="AccordionContentText">{children}</div>
      </Accordion.Content>
    )
  );

  const dispatch = useDispatch();

  const state = useSelector(useTask);

  const tasks = state.completedTasks;

  const handleClick = (e: any) => {
    e.stopPropagation();
    setIsChecked(!isChecked);
    if (done) {
      dispatch(addTask({ title, description, date, done: false }));
    } else {
      dispatch(addCompletedTask({ title, description, date, done: true }));
    }
  };

  const handleDeleteTask = (e: any) => {
    e.stopPropagation();
    dispatch(delTask({ title, description, date, done }));
  };

  const showDate = (date: string[]) => {
    if (date.length === 0) {
      return;
    }
    if (date.length === 1) {
      return date[0];
    }
    if (date.length > 1) {
      return `de ${date[0]} ate ${date[date.length - 1]}`;
    }
  };

  const showDesc = (description: any) => {
    if (description.length === 0) {
      return "Sem descrição";
    }
    if (description.length > 0) {
      return description;
    }
  };

  return (
    <Accordion.Root className="AccordionRoot" type="single" collapsible>
      <Accordion.Item className="AccordionItem" value="item-1">
        <AccordionTrigger>
          {
            <div>
              <input
                className="doneInput"
                type={"checkbox"}
                defaultChecked={done}
                onClick={handleClick}
              ></input>
              <img
                src="./src/assets/icons8-remove-50.png"
                alt=""
                onClick={handleDeleteTask}
              />
            </div>
          }
          <div className="taskTitle">{title}</div>
        </AccordionTrigger>
          {
              description === '' && date.length < 1 ? (null) : (
              <AccordionContent>
              {
                description ? (
                  <div className="taskDescription">{showDesc(description)}</div>
                ) : (null)
              }
              {
                date ? (
                  <div title={date.toString()} className="taskDate">{showDate(date)}</div>
                ) : (null)
              }
            </AccordionContent>
            )
          }
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default Task;
