import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/shared/schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { SignupEnum } from 'src/shared/enum/signup.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) { }
  async signUp(signUpDto: SignupDto): Promise<{ token: string }> {
    try {
      const { email, password, userName, mobileNumber } = signUpDto;

      // Check if the user already exists
      const existingUser = await this.userModel.findOne({ email });
      if (existingUser) {
        const customError = { message: "User already exists", code: 400, userExists: true };
        throw customError;
      }

      // Create the user
      const newUser = new this.userModel({
        userName,
        email,
        password,
        mobileNumber,
        role: SignupEnum.parent,
        children: [],
      });

      await newUser.save();

      // Generate a JWT token
      const token = this.jwtService.sign({ userId: newUser._id, email: newUser.email, userName: newUser.userName, mobileNumber: newUser.mobileNumber });

      return { token };
    } catch (error) {
      throw error;
    }

  }

  async login(loginDto: LoginDto) {
    try {
      const { email, mobileNumber, password } = loginDto;

      let user = null;

      // Find user by email or mobile number
      if (email) {
        user = await this.userModel.findOne({ email });
      } else if (mobileNumber) {
        user = await this.userModel.findOne({ mobileNumber });
      }

      if (!user || user.password !== password) {
        const customError = { message: 'Email, Mobile Number, or Password is invalid', code: 400 };
        throw customError;
      }

      // Generate JWT token
      const token = this.jwtService.sign({ userId: user._id, email: user.email, userName: user.userName, mobileNumber: user.mobileNumber });
      return {
        message: 'Login successful',
        token,
      };
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
