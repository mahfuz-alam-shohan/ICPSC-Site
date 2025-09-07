import { Router } from "express";
import { getUsers, createUser, patchUser, removeUser } from "./controller";
import { requireAuth } from "../../middleware/auth";
import { authorize } from "../../middleware/authorize";
import { Roles } from "../../constants/roles";

const router = Router();
router.use(requireAuth, authorize([Roles.ADMIN]));

router.get("/", getUsers);
router.post("/", createUser);
router.patch("/:id", patchUser);
router.delete("/:id", removeUser);

export default router;
