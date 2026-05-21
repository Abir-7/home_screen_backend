/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { UserService } from '../user/user.service';
import { UserAuthenticationService } from '../user-authentication/user-authentication.service';
import { AuthType } from '../user-authentication/entities/user-authentication.entity';
import { generateOtp } from '../../utils/otp-generator.util';
import { JwtService } from '@nestjs/jwt';
import {
  comparePassword,
  generateAccessToken,
  hashPassword,
} from '../../utils/security.util';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthenticationService,
    @InjectQueue('communication') private communicationQueue: Queue,
    private jwtService: JwtService,
  ) {}

  private validateIdentifier(email?: string, phone?: string) {
    if (!email && !phone) {
      throw new BadRequestException('Email or phone is required');
    }
  }

  async login(loginDto: LoginDto) {
    const { email, phone, password } = loginDto;
    this.validateIdentifier(email, phone);

    // Find user by email or phone (including password)
    const user = email
      ? await this.userService.findByEmail(email, true)
      : phone
        ? await this.userService.findByPhone(phone, true)
        : null;

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Load user profile
    const userWithProfile = await this.userService.findOne(user.id);

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user is verified
    if (!user.is_verified) {
      throw new ForbiddenException('Please verify your account first');
    }

    // Generate JWT token
    const payload = { userId: user.id, userRole: user.role || 'user' };
    const accessToken = await generateAccessToken(this.jwtService, payload);
    const refreshToken = 'REFRESH_TOKEN_PLACEHOLDER'; // TODO: Implement refresh token logic

    return {
      message: 'Login successful',
      user: {
        userId: user.id,
        userRole: user.role || 'user',
        isProfileDataComplete: !!userWithProfile?.profile,
      },
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async register(registerDto: RegisterDto) {
    const { email, phone, password } = registerDto;
    this.validateIdentifier(email, phone);

    // Check if user exists
    const existingUser = email
      ? await this.userService.findByEmail(email)
      : phone
        ? await this.userService.findByPhone(phone)
        : null;

    if (existingUser) {
      if (existingUser.is_verified) {
        throw new ConflictException('User already exists');
      }
      // If user exists but is not verified, remove auth records and then delete the old user to allow re-registration
      const existingAuth = await this.userAuthService.findOneByUser(existingUser.id);
      if (existingAuth) {
        await this.userAuthService.remove(existingAuth.id);
      }
      await this.userService.remove(existingUser.id);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user (unverified)
    const user = await this.userService.create({
      email,
      phone,
      password: hashedPassword,
      is_verified: false,
    });

    // Generate OTP
    const otp = generateOtp(5);

    // Store OTP in UserAuthentication table
    await this.userAuthService.create({
      otp,
      type: email ? AuthType.EMAIL : AuthType.PHONE,
      user: user,
    });

    // Send OTP via Email or SMS (Dispatch to queue)
    if (email) {
      await this.communicationQueue.add('sendEmail', { email, otp });
    } else if (phone) {
      await this.communicationQueue.add('sendSms', { phone, otp });
    } else {
      throw new BadRequestException('Email or phone is required');
    }

    return {
      message: 'User registered. Please verify your account with the OTP sent.',
      userId: user.id,
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { userId, otp } = verifyOtpDto;

    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const auth = await this.userAuthService.findOneByUser(user.id);

    if (!auth || auth.otp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    await this.userService.update(user.id, { is_verified: true });
    await this.userAuthService.remove(auth.id);

    // Generate JWT token
    const payload = { userId: user.id, userRole: user.role || 'user' };
    const accessToken = await generateAccessToken(this.jwtService, payload);
    const refreshToken = 'REFRESH_TOKEN_PLACEHOLDER'; // TODO: Implement refresh token logic

    return {
      message: 'Account verified successfully',
      accessToken: accessToken,
      refreshToken: refreshToken,
      userId: user.id,
      userRole: user.role || 'user',
    };
  }
}
