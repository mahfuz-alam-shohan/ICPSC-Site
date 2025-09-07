import { Router } from "express";
import { listDrivers, createDriver } from "./controller";
import { requireAuth } from "../../middleware/auth";
import { authorize } from "../../middleware/authorize";
import { Roles } from "../../constants/roles";

const router = Router();
router.use(requireAuth);
router.get("/", authorize([Roles.ADMIN]), listDrivers);
router.post("/", authorize([Roles.ADMIN]), createDriver);

export default router;
