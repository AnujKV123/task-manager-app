import { useState, useEffect } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
};

type EditTaskModalProps = {
  task: Task | null;
  onUpdate: (updatedTask: Task) => void;
  onClose: () => void;
};

export const EditTaskModal: React.FC<EditTaskModalProps> = ({
  task,
  onUpdate,
  onClose,
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const handleUpdate = () => {
    if (task && title.trim() && description.trim()) {
      onUpdate({
        ...task,
        title,
        description,
      });
      onClose();
    }
  };

  if (!task) return null;

  return (
    <div className="modal_overlay">
      <div className="modal_content_edit">
        <h2>Edit Task</h2>
        <div className="edit_todo_container_inner">
          <div className="container_title">
            <label htmlFor="edit-title">Title</label>
            <input
              type="text"
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="container_description">
            <label htmlFor="edit-description">Description</label>
            <textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="modal_buttons">
            <button className="btn_add_todo" onClick={handleUpdate}>
              Update
            </button>
            <button className="close_btn_modal" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
