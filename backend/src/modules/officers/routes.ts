import { Router } from "express";
import { listOfficers, createOfficer } from "./controller";
import { requireAuth } from "../../middleware/auth";
import { authorize } from "../../middleware/authorize";
import { Roles } from "../../constants/roles";

const router = Router();
router.use(requireAuth);
router.get("/", authorize([Roles.ADMIN]), listOfficers);
router.post("/", authorize([Roles.ADMIN]), createOfficer);

export default router;
