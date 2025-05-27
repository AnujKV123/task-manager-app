import { useState } from "react";
import { addTask, getAllTasks } from "../service/api.service";

export type Task = {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
};

type AddTaskProps = {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

type ErrorState = {
  title?: string;
  description?: string;
};

export const AddTask: React.FC<AddTaskProps> = ({ setTasks }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<ErrorState>({});

  const handleAddTask = async() => {
    const newError: ErrorState = {};

    if (title.trim().length <= 0) {
      newError.title = "Please enter the title";
    }

    if (description.trim().length <= 0) {
      newError.description = "Please enter the description";
    }

    setError(newError);

    if (Object.keys(newError).length === 0) {
        await addTask({title, description, isCompleted: false});
        const updatedTasks = await getAllTasks();
        setTasks(updatedTasks);

      setTitle("");
      setDescription("");
    }
  };

  return (
    <div className="add_todo_parent">
      <div className="add_todo_container">
        <div className="add_todo_container_inner">
          <div className="container_title">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {error.title && <span className="error">{error.title}</span>}
          </div>
          <div className="container_description">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {error.description && (
              <span className="error">{error.description}</span>
            )}
          </div>
          <div>
            <button className="btn_add_todo" onClick={handleAddTask}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
