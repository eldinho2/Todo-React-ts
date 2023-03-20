import React from "react";
import { useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import DayInput from "./DayInput";
import { Todo } from "../Types/Todo";
import "../styles/InsertTask.css";
import { addTask, useTask } from "../redux/sliceTask";
import { useDispatch, useSelector } from "react-redux";

export default function InsertTask() {
  const dispatch = useDispatch();
  const state = useSelector(useTask);
  const tasks = state.tasks;

  const [error, setError] = useState(false);
  const [form, setForm] = useState<Todo>({
    title: "",
    description: "",
    date: [],
    done: false,
  });

  const onDaysSelected = (days: string[]) => {
    setForm({ ...form, date: days });
  };

  const checkTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setForm({ ...form, title: title });
    const check = tasks.find((task: any) => task.title === title);
    if (check) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (form.title === "") {
      e.preventDefault();
      setError(true);
      return;
    }
    dispatch(addTask(form));
    setForm({
      title: "",
      description: "",
      date: [],
      done: false,
    });
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="Button violet">
          <svg
            className=""
            fill="#000000"
            height="10px"
            width="10px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 455 455"
          >
            <polygon
              points="455,212.5 242.5,212.5 242.5,0 212.5,0 212.5,212.5 0,212.5 0,242.5 212.5,242.5 212.5,455 242.5,455 242.5,242.5 
	455,242.5 "
            />
          </svg>
          Adicionar Tarefa
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="AlertDialogOverlay" />
        <AlertDialog.Content className="AlertDialogContent">
          <AlertDialog.Title className="AlertDialogTitle">
            Detalhes
          </AlertDialog.Title>
          <div className="form-main">
            <form action="">
              <div className="form-group">
                <label htmlFor="title">Título</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={form.title}
                  maxLength={50}
                  onChange={(e) => checkTitle(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descrição</label>
                <textarea
                  rows={5}
                  cols={30}
                  className="form-description"
                  name="description"
                  id="description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>
              <div className="form-data">
                <label htmlFor="date">Data</label>
                <DayInput onDaysSelected={onDaysSelected} />
              </div>
              <div className="form-group"></div>
            </form>
            <div className="form-submit">
              <AlertDialog.Action asChild>
                <button
                  className="Button-mauve"
                  disabled={error}
                  onClick={handleForm}
                >
                  Adicionar
                </button>
              </AlertDialog.Action>
              <AlertDialog.Cancel asChild>
                <button className="Button-red">Cancel</button>
              </AlertDialog.Cancel>
            </div>
            {error && (
              <div className="error">
                <p>
                  Não é possivel atribuir 2 Tasks com o mesmo{" "}
                  <strong>nome</strong> ou <strong>vazio</strong>
                </p>
              </div>
            )}
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
