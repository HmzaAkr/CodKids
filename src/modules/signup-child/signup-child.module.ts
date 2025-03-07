import { Module } from '@nestjs/common';
import { SignupChildService } from './signup-child.service';
import { SignupChildController } from './signup-child.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { signupChildSchema } from 'src/shared/schemas/signupChild.schema';
import { UserSchema } from 'src/shared/schemas/user.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: 'signupChild', schema: signupChildSchema},
      { name: 'User', schema: UserSchema }
    ])
  ],
  controllers: [SignupChildController],
  providers: [SignupChildService],
})
export class SignupChildModule {}
