import { Router } from "express";
import { listStudents, createStudent } from "./controller";
import { requireAuth } from "../../middleware/auth";
import { authorize } from "../../middleware/authorize";
import { Roles } from "../../constants/roles";

const router = Router();
router.use(requireAuth);
router.get("/", authorize([Roles.ADMIN, Roles.TEACHER]), listStudents);
router.post("/", authorize([Roles.ADMIN]), createStudent);

export default router;
