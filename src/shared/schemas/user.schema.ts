import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps:true,
})
export class User extends Document {

  @Prop({ required: true })
  userName: string;

  @Prop()
  mobileNumber: string;

  @Prop({ unique: true, message: 'Duplicate email entered' })
  email?: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  role: string;
  
  @Prop({ required: false ,default:[] })
  children: string[];
}


export const UserSchema = SchemaFactory.createForClass(User);
