import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './Jwt.interface'; // Create a payload interface
import { AuthService } from '../auth.service';  // Adjust the path as needed
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../shared/schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET_KEY',  // Replace with a more secure secret key
    });
  }

  async validate(payload: JwtPayload) {
    // Find the user by the userId in the JWT payload
    const user = await this.userModel.findById(payload.userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;  // This will be added to `req.user` in your request handler
  }
}
