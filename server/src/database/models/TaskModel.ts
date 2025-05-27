import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema: Schema = new Schema(
    {
        title: { 
            type: String, 
            required: true,
        },
        description: { 
            type: String, 
            required: true 
        },
        isCompleted: { 
            type: Boolean, 
            default: false 
        },
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model<ITask>("Task", taskSchema);
export default Task;
