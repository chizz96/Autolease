import { IsNull } from "typeorm";
import { User } from "../entities/user.entity.js"
import { AppDataSource } from "../config/db.js"
import { AuthEntity } from "../entities/auth.entity.js";



const userRepository = AppDataSource.getRepository(User);
const authRepository = AppDataSource.getRepository(AuthEntity);

// Find user by email but do not include password, otp and otpexpiry
export const findUserByEmail = (email, includeSecrets = false) => {
  let query = userRepository.findOne({ where: { email, deletedAt: IsNull() } });
  if (includeSecrets) {
    query = query.select("+password +otp +otpExpiry phoneNumber");
  }
  return query;
};

// find user by id but do not include password, otp and otpexpiry
export const findUserById = (id, includeSecrets = false) => {
  let query = userRepository.findOne({ where: { _id: id, deletedAt: IsNull() } });
  if (includeSecrets) {
    query = query.select("+password +otp +otpExpiry phoneNumber, profilePicture, bio");
  } else {
    query = query.select("-password");
  }
  return query;
};

// find user by otp but do not include otp and otpexpiry
export const findUserByOtp = (otp) =>
  userRepository.findOne({where: { otp, }, select: { otp: true, otpExpiresAt: true,}});

// update user by id but do not include password
export const updateUserById = (id, data) =>
  userRepository.findOneAndUpdate({ where: { _id: id, deletedAt: IsNull() } }, data, { new: true }).select(
    "-password",
  );

// find all users but do not include password
export const findAllUsers = () =>
  userRepository.find({ where: { deletedAt: IsNull() } }).select("-password").lean();


export const createUser = async (data) => {
  const user = userRepository.create(data);
  return await userRepository.save(user);
};


// Create a new refresh token

export const createRefreshToken = async (data) => {
  const refreshToken = authRepository.create(data);
  return await authRepository.save(refreshToken);
};

// Find a refresh token by its hash and check if it is not revoked
export const findRefreshTokenByHash = (tokenHash) =>
  authRepository.findOne({ where: { tokenHash, isRevoked: false } });


// Revoke a refresh token by its hash and optionally set the replacedByTokenHash
export const revokeRefreshToken = async (tokenHash, replacedByTokenHash = null) => {
  await authRepository.update(
    { tokenHash },
    {
      isRevoked: true,
      replacedByTokenHash,
    }
  );

  return authRepository.findOne({
    where: {
      tokenHash,
    },
  });
};

// Revoke all refresh tokens for a user
export const revokeAllUserRefreshTokens = async (userId) => {
  return authRepository.update(
    {
      user: {
        id: userId,
      },
      isRevoked: false,
    },
    {
      isRevoked: true,
    }
  );
};




