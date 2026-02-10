import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './utils/connectDb.js';
import authRoutes from './routes/authRoutes.js'
import interviewRoute from './routes/interviewRoute.js'
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000 ;
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000", process.env.FRONTEND_URL],
  credentials: true,
}));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectDB();
});

app.use("/api/auth", authRoutes)
app.use("/api/interview", interviewRoute)

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});


