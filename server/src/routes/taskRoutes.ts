
import { Router } from "express";
import { 
    getAllTasks,
    getCompletedTasks,
    getPendingTasks,
    addTask,
    getTaskById,
    deleteTaskById,
    updateTaskById,
    completeTaskById
} from "../controllers/taskControllers";

const taskRouter = Router();

taskRouter.route("/add-task").post(addTask);
taskRouter.route("/update-task/:id").post(updateTaskById);
taskRouter.route("/delete-task/:id").post(deleteTaskById);
taskRouter.route("/complete-task/:id").post(completeTaskById);
taskRouter.route("/get-task/:id").get(getTaskById);
taskRouter.route("/get-all-tasks").get(getAllTasks);
taskRouter.route("/get-pending-tasks").get(getPendingTasks);
taskRouter.route("/get-completed-tasks").get(getCompletedTasks);

export default taskRouter;