import { Router } from "express";
import { listLibrarians, createLibrarian } from "./controller";
import { requireAuth } from "../../middleware/auth";
import { authorize } from "../../middleware/authorize";
import { Roles } from "../../constants/roles";

const router = Router();
router.use(requireAuth);
router.get("/", authorize([Roles.ADMIN]), listLibrarians);
router.post("/", authorize([Roles.ADMIN]), createLibrarian);

export default router;
