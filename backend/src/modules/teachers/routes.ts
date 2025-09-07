import { Router } from "express";
import { listTeachers, createTeacher } from "./controller";
import { requireAuth } from "../../middleware/auth";
import { authorize } from "../../middleware/authorize";
import { Roles } from "../../constants/roles";

const router = Router();
router.use(requireAuth);
router.get("/", authorize([Roles.ADMIN, Roles.OFFICER]), listTeachers);
router.post("/", authorize([Roles.ADMIN]), createTeacher);

export default router;
