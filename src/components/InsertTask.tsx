import React from "react";
import { useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import DayInput from "./DayInput";
import { Todo } from "../Types/Todo";
import "../styles/InsertTask.css";

interface Props {
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function InsertTask({ setTodoList }: Props) {
  const [form, setForm] = useState<Todo>({
    title: "",
    description: "",
    date: [],
    done: false,
  });

  const onDaysSelected = (days: string[]) => { 
    setForm({ ...form, date: days });
  }

  const handleForm = () => {
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
        <button className="Button violet">Adicionar Tarefa</button>
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
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
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
              <button onClick={handleForm}>Adicionar</button>
            </AlertDialog.Action>
            <AlertDialog.Cancel asChild>
              <button>Cancel</button>
            </AlertDialog.Cancel>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
