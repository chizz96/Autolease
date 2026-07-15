import express from "express";
import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.js";
import { signUpSchema, verifyEmailSchema, signInSchema, refreshTokenSchema, signOutSchema, resendOtpSchema} from "../validators/auth.validator.js";
import { error } from "node:console";
import * as oauthController from "../controllers/oauth.controller.js"

const router = Router();


router.post("/signup", validate(signUpSchema), authController.signUp); 

router.post("/verify-email", validate(verifyEmailSchema), authController.verifyEmail);
router.post("/signin", validate(signInSchema), authController.signIn);
router.post("/refresh-token", validate(refreshTokenSchema), authController.refreshToken);
router.post("/signout", validate(signOutSchema), authController.signOut);
router.post("/resend-otp", validate(resendOtpSchema), authController.resendOtp);


router.get("/google", oauthController.googleAuth);
router.get("/redirect", oauthController.googleRedirect);


export default router;