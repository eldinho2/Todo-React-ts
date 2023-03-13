import React, {useState} from "react";
import { Todo } from "../Types/Todo";


export default function ChoresDone() {
  const [choresDone, setChoresDone] = useState<string[]>([]);

  return (
    <div>
      <h1>Chores Done</h1>
      <div>
    {choresDone.map((chore: string) => {
      return (
        <div>
          <p>{chore}</p>
        </div>
      )
    })}
    </div>
    </div>
  );
}