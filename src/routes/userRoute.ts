import { Router } from "express";
import {
  createNewUser,
  forgotPassword,
  resetPassword,
  signin,
  updateUserDetails,
} from "../handler/user_handler"
import protect from "../middleware/protect";

const router = Router();

/**
 * POST /users/register
 * POST /users/signin
 * POST /users/updatepassword
 * POST /users/forgotpassword
 * POST /users/resetpassword
 **/

router.post("/register", createNewUser);
router.post("/signin", signin);
router.post("/userdetails", protect, updateUserDetails);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword", resetPassword);

export default router;
