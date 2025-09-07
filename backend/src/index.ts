import express from "express";
import cors from "cors";
import helmet from "helmet";

import authRoutes from "./modules/auth/routes";
import studentRoutes from "./modules/students/routes";
import teacherRoutes from "./modules/teachers/routes";
import attendanceRoutes from "./modules/attendance/routes";
import feeRoutes from "./modules/fees/routes";
import resultRoutes from "./modules/results/routes";
import userRoutes from "./modules/users/routes";
import roleRoutes from "./modules/roles/routes";

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
