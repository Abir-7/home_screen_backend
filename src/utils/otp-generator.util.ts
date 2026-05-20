/**
 * Generates a random numeric OTP of a specified length.
 * @param length The number of digits in the OTP. Defaults to 5.
 * @returns A string representing the numeric OTP.
 */
export const generateOtp = (length: number = 5): string => {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};
