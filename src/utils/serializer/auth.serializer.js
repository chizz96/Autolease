export const toPublishUser = (user) => ({
  id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  role: user.role,
  isVerified: user.isVerified,
  authProvider: user.authProvider,
  phoneNumber: user.phoneNumber,
  bio: user.bio,
  profilePicture: user.profilePicture,
});



export const toPublishWallet = (wallet) => ({
  id: wallet.id,
  balance: wallet.balance,
  currency: wallet.currency,
  status: wallet.status,
  isActive: wallet.isActive,
});