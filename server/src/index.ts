import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan"
import routeProjects from "../routes/routeProjects";
import routeTasks from "../routes/routeTasks";
// configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));




app.get("/", (req, res) => {
    res.send("Hello from Taskify API");
});

app.use("/projects", routeProjects);
app.use("/tasks", routeTasks);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

