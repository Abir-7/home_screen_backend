import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

/**
 * Hashes a plain text password using bcrypt.
 * @param password The plain text password to hash.
 * @returns A promise that resolves to the hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Compares a plain text password with a bcrypt hash.
 * @param password The plain text password.
 * @param hash The bcrypt hash.
 * @returns A promise that resolves to true if the password matches the hash.
 */
export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

/**
 * Generates a JWT access token.
 * @param jwtService The JwtService instance to use for signing.
 * @param payload The payload to include in the token.
 * @returns A promise that resolves to the generated access token.
 */
export const generateAccessToken = async (
  jwtService: JwtService,
  payload: { userId: string; userRole: string },
): Promise<string> => {
  return await jwtService.signAsync(payload);
};
