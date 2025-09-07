import { Router } from "express";
import { publishResult, getResult } from "./controller";
import { requireAuth } from "../../middleware/auth";
import { authorize } from "../../middleware/authorize";
import { Roles } from "../../constants/roles";

const router = Router();
router.use(requireAuth);
router.post("/", authorize([Roles.ADMIN, Roles.TEACHER]), publishResult);
router.get("/:studentId", authorize([Roles.ADMIN, Roles.STUDENT, Roles.TEACHER]), getResult);

export default router;
