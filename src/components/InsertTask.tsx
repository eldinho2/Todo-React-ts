import React from "react";
import { useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import DayInput from "./DayInput";
import { Todo } from "../Types/Todo";
import "../styles/InsertTask.css";
import { addTask, useTask } from '../redux/sliceTask'
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
    const check = tasks.find((task) => task.title === title);
    if (check) {
      setError(true);
    } else {
      setError(false);
    }
  }

  const handleForm = (e) => {
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
        <button className="Button violet"><img src="./src/assets/plus-svgrepo-com.svg" alt="" />Adicionar Tarefa</button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="AlertDialogOverlay" />
        <AlertDialog.Content className="AlertDialogContent">
          <AlertDialog.Title className="AlertDialogTitle">
            Detalhes
          </AlertDialog.Title>
          <div>
            <form action="">
              <div className="form-group">
                <label htmlFor="title">Título</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={form.title}
                  onChange={(e) => checkTitle(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descrição</label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Data</label>
                <DayInput onDaysSelected={onDaysSelected} />
              </div>
              <div className="form-group"></div>
            </form>
            <AlertDialog.Action asChild>
              <button disabled={error} onClick={handleForm}>Adicionar</button>
            </AlertDialog.Action>
            <AlertDialog.Cancel asChild>
              <button>Cancel</button>
            </AlertDialog.Cancel>
            {error && (
              <div className="error">
                <p>Não é possivel atribuir 2 Tasks com o mesmo <strong>nome</strong> ou <strong>vazio</strong></p>
              </div>
            )
            }
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
