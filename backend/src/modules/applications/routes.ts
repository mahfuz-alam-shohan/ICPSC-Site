import { Router } from "express";
import { listApplications, createApplication } from "./controller";
import { requireAuth } from "../../middleware/auth";
import { authorize } from "../../middleware/authorize";
import { Roles } from "../../constants/roles";

const router = Router();
router.use(requireAuth);
router.get("/", authorize([Roles.ADMIN]), listApplications);
router.post("/", authorize([Roles.ADMIN]), createApplication);

export default router;
