import bcrypt from "bcrypt";
import { AppDataSource } from "../config/db.js"
import { findUserByEmail, findUserByOtp, createUser, updateUserById,findAllUsers,
createRefreshToken, findRefreshTokenByHash, revokeRefreshToken, revokeAllUserRefreshTokens }
from "../repositories/auth.repository.js";
import { sendTemplateEmail } from "../utils/email.utils.js";
import { issueTokenPair, rotateRefreshToken, revokeRefreshTokenByValue, signAccessToken } from "../utils/authjwt.utils.js";
import { AppError } from "../utils/AppError.js";
import { AuthProvider } from "../types/authProvider.js";
import { toPublishUser , toPublishWallet } from "../utils/serializer/auth.serializer.js";



const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const signUp = async ({ firstName, lastName, email, password }) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new AppError("User already exists", 409, "DUPLICATE_USER");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = generateOtp();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

  const newUser = await createUser({
    firstName,
    lastName,
    email,
    otp,
    otpExpiry,
    password: hashedPassword,
    authProvider: AuthProvider.LOCAL,
  });

  sendTemplateEmail(email, "Email Verification", "signup", {
    firstName,
    lastName,
    otp,
  });

  return toPublishUser(newUser);
};

export const cosignUp = async ({firstName, lastName, email, password, phoneNumber}) => {

  return await AppDataSource.transaction(async (manager) => {

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new AppError("User already exists", 409, "DUPLICATE_USER");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const newUser = manager.create(User, {
      firstName,
      lastName,
      email,
      otp,
      otpExpiry,
      password: hashedPassword,
      authProvider: AuthProvider.LOCAL,
      phoneNumber,
      role,
    });

    const savedUser = await manager.save(newUser);

    // creating a wallet for the carow
    const newWallet = manager.create(Wallet, {
      user: savedUser,
      balance: 0,
      currency: "NGN",
      isActive: true,
      status: walletStatus.ACTIVE,
    });

    await manager.save(newWallet);

    sendTemplateEmail(email, "Email Verification", "signup", {
        firstName,
        lastName,
        otp,
    });

    return { user: toPublicUser(newUser), wallet: toPublicWallet(newWallet) };

  });


}


//email verification

export const verifyEmail = async ({ otp }) => {
  const user = await findUserByOtp(otp);
  if (!user) {
    throw new AppError("Invalid OTP", 400, "INVALID_OTP");
  }

  if (user.otpExpiry < new Date()) {
    throw new AppError("OTP has expired", 400, "OTP_EXPIRED");
  }

  await updateUserById(user._id, {
    isVerified: true,
    $unset: { otp: 1, otpExpiry: 1 },
  });

  sendTemplateEmail(user.email, "Email Verified Successfully", "verify-email", {
    firstName: user.firstName,
  });
};


export const signIn = async ({ email, password }) => {
  const user = await findUserByEmail(email, true);
  if (!user) {
    throw new AppError("Invalid email or password", 400, "INVALID_CREDENTIALS");
  }

  if (user.authProvider === AuthProvider.GOOGLE) {
    throw new AppError("Please sign in with Google", 400, "USE_GOOGLE_SIGNIN");
  }

  if (!user.password) {
    throw new AppError("Invalid email or password", 400, "INVALID_CREDENTIALS");
  }

  if (!user.isVerified) {
    throw new AppError(
      "Please verify your email before signing in",
      400,
      "EMAIL_NOT_VERIFIED",
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 400, "INVALID_CREDENTIALS");
  }

  const tokens = await issueTokenPair(user);

  return {
    user: toPublicUser(user),
    ...tokens,
  };
};


export const refreshSession = async ({ refreshToken }) => {
  const { userId, refreshToken: newRefreshToken } =
    await rotateRefreshToken(refreshToken);

  const user = await findUserById(userId);
  if (!user) {
    throw new AppError("User not found", 404, "NOT_FOUND");
  }

  const accessToken = signAccessToken(user);

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};


export const signOut = async ({ refreshToken }) => {
  await revokeRefreshTokenByValue(refreshToken);
};


export const resendOtp = async ({ email }) => {
  const user = await findUserByEmail(email, true);
  if (!user) {
    throw new AppError("User not found", 404, "NOT_FOUND");
  }

  const otp = generateOtp();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

  await updateUserById(user._id, { otp, otpExpiry });

  sendTemplateEmail(user.email, "Your New Verification Code", "resend-otp", {
    firstName: user.firstName,
    lastName: user.lastName,
    otp,
  });
};