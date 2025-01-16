import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from 'src/shared/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: `codingwithhamza`,
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule { }
