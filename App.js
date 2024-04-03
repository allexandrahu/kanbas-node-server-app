import express from "express";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js"; 
import cors from "cors";
const app = express();
app.use(cors({
    credentials: true,
    origin: [process.env.FRONTEND_URL, "http://localhost:3000"]
  }));
CourseRoutes(app);
app.use(express.json());
CourseRoutes(app);
Lab5(app);
app.listen(process.env.PORT || 4000);