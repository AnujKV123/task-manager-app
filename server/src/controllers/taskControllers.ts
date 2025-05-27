
import { Request, Response } from "express";
import { Task} from "../database";

const getAllTasks = async (req: Request, res: Response) => {
    const tasks = await Task.find();
    res.json(tasks);
};

const getCompletedTasks = async (req: Request, res: Response) => {
    const tasks = await Task.find({ isCompleted: true });
    res.json(tasks);
};

const getPendingTasks = async (req: Request, res: Response) => {
    const tasks = await Task.find({ isCompleted: false });
    res.json(tasks);
};

const addTask = async (req: Request, res: Response) => {
    const {title, description, isCompleted } = req.body;
    const newTask = new Task({title, description, isCompleted });
    const savedTask = await newTask.save();
    res.json(savedTask);
};

const getTaskById = async (req: Request, res: Response) => {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
        res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
};

const deleteTaskById = async (req: Request, res: Response) => {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
        res.status(404).json({ message: "Task not found" });
    }
    res.json(deletedTask);
};

const updateTaskById = async (req: Request, res: Response) => {
    const taskId = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
        new: true,
    });
    if (!updatedTask) {
        res.status(404).json({ message: "Task not found" });
    }
    res.json(updatedTask);
};

const completeTaskById = async (req: Request, res: Response) => {
    const taskId = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(taskId, { isCompleted: true }, { new: true });
    if (!updatedTask) {
        res.status(404).json({ message: "Task not found" });
    }
    res.json(updatedTask);
};

export {
    getAllTasks,
    getCompletedTasks,
    getPendingTasks,
    addTask,
    getTaskById,
    deleteTaskById,
    updateTaskById,
    completeTaskById
};