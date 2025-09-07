import { Router } from "express";
import { listStaff, createStaff } from "./controller";
import { requireAuth } from "../../middleware/auth";
import { authorize } from "../../middleware/authorize";
import { Roles } from "../../constants/roles";

const router = Router();
router.use(requireAuth);
router.get("/", authorize([Roles.ADMIN]), listStaff);
router.post("/", authorize([Roles.ADMIN]), createStaff);

export default router;
