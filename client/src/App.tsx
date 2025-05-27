import "./styles.css";
import { AddTask } from "./components/AddTask";
import { TaskList } from "./components/TaskList";
import { useState } from "react";
import { Task } from "./components/AddTask";
export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <h4>Add Task</h4>
      <AddTask setTasks={setTasks} />
      <h4>Task Lists</h4>
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
