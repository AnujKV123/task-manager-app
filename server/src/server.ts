
import express from 'express';
import { config } from "dotenv";
const app = express();
import { connectDB } from './database';
import taskRouter from './routes/taskRoutes';
import cors from 'cors'

config();
const port = (process.env.PORT || 8000);
app.use(express.json());
const corsOptions = {
      origin: ['http://localhost:3000'],
      methods: 'GET,POST,PUT,DELETE',
    };
app.use(cors(corsOptions));

app.use('/api/tasks', taskRouter);

connectDB();

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});