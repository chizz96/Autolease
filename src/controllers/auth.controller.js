import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.utils.js";
import * as userService from "../services/auth.services.js";


export const signUp = asyncHandler(async (req, res) => {
  const user = await userService.signUp(req.body);
  return sendSuccess(res, 201, "User created successfully", { user });
});

export const cosignUp = asyncHandler(async (req, res) => {
  const user = await userService.cosignUp(req.body);
  return sendSuccess(res, 201, "User created successfully", { user, wallet });
});


export const verifyEmail = asyncHandler(async (req, res) => {
  await userService.verifyEmail(req.body);
  return sendSuccess(res, 200, "Email verified successfully", null);
});


export const signIn = asyncHandler(async (req, res) => {
  const result = await userService.signIn(req.body);
  return sendSuccess(res, 200, "User signed in successfully", result);
});

export const refreshToken = asyncHandler(async (req, res) => {
  const tokens = await userService.refreshSession(req.body);
  return sendSuccess(res, 200, "Token refreshed successfully", tokens);
});

export const signOut = asyncHandler(async (req, res) => {
  await userService.signOut(req.body);
  return sendSuccess(res, 200, "Signed out successfully", null);
});

export const resendOtp = asyncHandler(async (req, res) => {
  await userService.resendOtp(req.body);
  return sendSuccess(res, 200, "OTP resent successfully", null);
});
