import express from "express";
import cors from "cors";
import helmet from "helmet";
import connect from "./config/db";

import authRoutes from "./modules/auth/routes";
import studentRoutes from "./modules/students/routes";
import teacherRoutes from "./modules/teachers/routes";
import attendanceRoutes from "./modules/attendance/routes";
import feeRoutes from "./modules/fees/routes";
import resultRoutes from "./modules/results/routes";
import userRoutes from "./modules/users/routes";
import roleRoutes from "./modules/roles/routes";
import librarianRoutes from "./modules/librarians/routes";
import staffRoutes from "./modules/staff/routes";
import driverRoutes from "./modules/drivers/routes";
import officerRoutes from "./modules/officers/routes";
import applicationRoutes from "./modules/applications/routes";
import registrationRoutes from "./modules/registrations/routes";
import dashboardRoutes from "./modules/dashboard/routes";

connect();

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
app.use("/api/librarians", librarianRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/officers", officerRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
