import { useState } from "react";
import { TaskViewModal } from "./TaskViewModal";
import { EditTaskModal } from "./EditTaskModal";
import { updateTaskById, getAllTasks, completeTaskById, deleteTaskById } from "../service/api.service";
import { Task } from "./AddTask";

type TaskListProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks }) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  const handleDelete = async(id: string) => {
    await deleteTaskById(id);
    const updatedTasks = await getAllTasks();
    setTasks(updatedTasks);
  };

  const handleUpdateTask = async(updatedTask: Task) => {
    await updateTaskById(updatedTask._id, updatedTask);
    const updatedTasks = await getAllTasks();
    setTasks(updatedTasks);
  };

  const handleComplete = async(id: string) => {
    await completeTaskById(id);
    const updatedTasks = await getAllTasks();
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.isCompleted;
    if (filter === "completed") return task.isCompleted;
    return true;
  });

  return (
    <div className="container_list_projects">
      <div>
        <div className="filter_in_header">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "pending" ? "active" : ""}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
        <div className="container_list_header">
          <div className="container_list_item_header">
            <span>Id</span>
            <span>Title</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
        </div>
        {filteredTasks.map((task, index) => (
          <div key={index+1} className="container_item_header">
            <div className="container_item_item_header">
              <span>{index + 1}</span>
              <span title={task.title}>
                {task.title.length > 30
                  ? task.title.slice(0, 30) + "..."
                  : task.title}
              </span>
              <span>{task.isCompleted ? "Complete" : "Pending"}</span>
              <div>
                <button onClick={() => setSelectedTask(task)}>View</button>
                <button
                  disabled={task.isCompleted}
                  onClick={() => setEditingTask(task)}
                >
                  Edit
                </button>
                <button
                  disabled={task.isCompleted}
                  onClick={() => handleComplete(task._id)}
                >
                  Completed
                </button>
                <button onClick={() => handleDelete(task._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
        <TaskViewModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
        <EditTaskModal
          task={editingTask}
          onUpdate={handleUpdateTask}
          onClose={() => setEditingTask(null)}
        />
      </div>
    </div>
  );
};
