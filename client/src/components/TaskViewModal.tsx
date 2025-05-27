import { Task } from "./AddTask";

type TaskViewModalProps = {
  task: Task | null;
  onClose: () => void;
};

export const TaskViewModal: React.FC<TaskViewModalProps> = ({
  task,
  onClose,
}) => {
  if (!task) return null;

  return (
    <div className="modal_overlay">
      <div className="modal_content">
        <h2>Task Details</h2>
        <p>
          <strong>Title:</strong> {task.title}
        </p>
        <p>
          <strong>Description:</strong> {task.description}
        </p>
        <button className="close_btn_modal" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
