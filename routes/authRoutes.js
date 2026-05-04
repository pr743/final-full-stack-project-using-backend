import express from "express";
import {

    verifyMagicLink,
    logout,
    getMe,
    sendMagicLinkHandler
} from "../controllers/authController.js";

import auth from "../middleware/auth.js";

const router = express.Router();


router.post("/send-link", sendMagicLinkHandler);


router.get("/verify", verifyMagicLink);


router.get("/me", auth, getMe);


router.post("/logout", logout);

export default router;