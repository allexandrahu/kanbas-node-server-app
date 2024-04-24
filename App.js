import express from "express";
import Hello from "./Hello.js";
import mongoose from "mongoose";
import UserRoutes from "./Users/routes.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import { config } from "dotenv";
import session from "express-session";
import "dotenv/config";
config({ path: ".env.local" });
const app = express();
Hello(app);
// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:3000",
//   })
// );

// CORS options
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization'
  };
  
  // Enable pre-flight across-the-board
  app.options('*', cors(corsOptions));  // Enables pre-flight request for ALL routes
  app.use(cors(corsOptions));
  
//   // Your routes
//   app.get('/api/courses', (req, res) => {
//     res.json({ message: "Courses fetched successfully." });
//   });
  


const CONNECTION_STRING =
  process.env.KANBAS_DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";
mongoose.connect(CONNECTION_STRING);
app.use(express.json());

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};

app.use(session(sessionOptions));

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.HTTP_SERVER_DOMAIN,
  };
}

UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);
