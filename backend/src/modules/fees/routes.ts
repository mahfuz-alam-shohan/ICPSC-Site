import { Router } from "express";
import { payFee, getFees } from "./controller";
import { requireAuth } from "../../middleware/auth";
import { authorize } from "../../middleware/authorize";
import { Roles } from "../../constants/roles";

const router = Router();
router.use(requireAuth);
router.post("/pay", authorize([Roles.ADMIN, Roles.STAFF]), payFee);
router.get("/:studentId", authorize([Roles.ADMIN, Roles.STUDENT, Roles.STAFF]), getFees);

export default router;
