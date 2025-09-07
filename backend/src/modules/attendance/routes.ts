import { Router } from "express";
import { markAttendance, getAttendance } from "./controller";
import { requireAuth } from "../../middleware/auth";
import { authorize } from "../../middleware/authorize";
import { Roles } from "../../constants/roles";

const router = Router();
router.use(requireAuth);
router.post("/", authorize([Roles.ADMIN, Roles.TEACHER]), markAttendance);
router.get("/", authorize([Roles.ADMIN, Roles.TEACHER]), getAttendance);

export default router;
