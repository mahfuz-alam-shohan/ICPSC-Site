import { Router } from "express";
import { listRegistrations, createRegistration } from "./controller";
import { requireAuth } from "../../middleware/auth";
import { authorize } from "../../middleware/authorize";
import { Roles } from "../../constants/roles";

const router = Router();
router.use(requireAuth);
router.get("/", authorize([Roles.ADMIN]), listRegistrations);
router.post("/", authorize([Roles.ADMIN]), createRegistration);

export default router;
