function generateReferralCode(length) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const codeLength = length || 8; // Default code length

  let referralCode = "";
  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    referralCode += charset[randomIndex];
  }

  return referralCode;
}
module.exports = generateReferralCode;
