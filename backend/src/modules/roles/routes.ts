import { Router } from "express";
import { getRoles, createRole, deleteRole } from "./controller";
import { requireAuth } from "../../middleware/auth";
import { authorize } from "../../middleware/authorize";
import { Roles } from "../../constants/roles";

const router = Router();
router.use(requireAuth, authorize([Roles.ADMIN]));

router.get("/", getRoles);
router.post("/", createRole);
router.delete("/:role", deleteRole);

export default router;
