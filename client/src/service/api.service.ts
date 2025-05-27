import { Task } from "../components/AddTask";

type TaskMy = {
  title: string;
  description: string;
  isCompleted: boolean;
};

const getAllTasks = async (): Promise<Task[]> => {
    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/get-all-tasks`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.info(error);
        return [];
    }
};
const addTask = async (task: TaskMy) => {
    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/add-task`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.info(error);
        return null;
    }
};

const updateTaskById = async (id: string, task: Task) => {
    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/update-task/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.info(error);
        return null;
    }
};

const deleteTaskById = async (id: string) => {
    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/delete-task/${id}`, {
            method: "POST",
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.info(error);
        return null;
    }
};

const completeTaskById = async (id: string) => {
    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/complete-task/${id}`, {
            method: "POST",
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.info(error);
        return null;
    }
};

export { 
    getAllTasks,  
    addTask, 
    updateTaskById,
    deleteTaskById,
    completeTaskById
};