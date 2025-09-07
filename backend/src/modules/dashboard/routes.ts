import { Router } from "express";
import { userDashboard, adminDashboard } from "./controller";
import { requireAuth } from "../../middleware/auth";
import { authorize } from "../../middleware/authorize";
import { Roles } from "../../constants/roles";

const router = Router();

router.get("/user", requireAuth, userDashboard);
router.get("/admin", requireAuth, authorize([Roles.ADMIN]), adminDashboard);

export default router;
