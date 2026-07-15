import crypto from "crypto";
import bcrypt from "bcrypt";
import { AppError } from "../../utils/AppError.js";
import { AuthProvider } from "../../types/authProvider.js";
import { issueTokenPair } from "../../utils/authjwt.utils.js";
import { exchangeCodeForGoogleProfile } from "../Googleoauthservices/google.provider.js";
import { toPublishUser } from "../../utils/serializer/auth.serializer.js";
import {
  createUser,
  findUserByEmail,
  findUserByGoogleId,
  updateUserById,
} from "../../repositories/auth.repository.js";

const hashRandomPassword = () =>
  bcrypt.hash(crypto.randomBytes(32).toString("hex"), 10);

const linkGoogleToUser = async (user, profile) => {
  if (user.googleId && user.googleId !== profile.googleId) {
    throw new AppError(
      "Email already linked to another Google account",
      409,
      "ACCOUNT_CONFLICT",
    );
  }

  return updateUserById(user._id, {
    googleId: profile.googleId,
    isVerified: true,
    authProvider:
      user.authProvider === AuthProvider.GOOGLE
        ? AuthProvider.GOOGLE
        : AuthProvider.HYBRID,
    ...(profile.profilePicture && !user.profilePicture
      ? { profilePicture: profile.profilePicture }
      : {}),
  });
};

const createGoogleUser = async (profile) =>
  createUser({
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    googleId: profile.googleId,
    authProvider: AuthProvider.GOOGLE,
    isVerified: true,
    profilePicture: profile.profilePicture,
    password: await hashRandomPassword(),
  });

export const authenticateGoogleProfile = async (profile) => {
  let user = await findUserByGoogleId(profile.googleId);
  let isNewUser = false;

  if (!user) {
    const existingUser = await findUserByEmail(profile.email);

    if (existingUser) {
      user = await linkGoogleToUser(existingUser, profile);
    } else {
      user = await createGoogleUser(profile);
      isNewUser = true;
    }
  }

  const tokens = await issueTokenPair(user);

  return {
    user: toPublicUser(user),
    isNewUser,
    ...tokens,
  };
};

export const handleGoogleOAuthCallback = async (code) => {
  const profile = await exchangeCodeForGoogleProfile(code);
  return authenticateGoogleProfile(profile);
};
