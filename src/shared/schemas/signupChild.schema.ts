import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SignupEnum } from '../enum/signup.enum';

@Schema({
    timestamps: true,
})
export class signupChild extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    age?: number; // Optional, only required for children

    @Prop({unique: true, required: true})
    userName: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, role: 'child' })
    role: SignupEnum.child;

    @Prop({ type: String, ref: 'User' })
    parentId?: string; // Reference to Parent (Only for children)

    @Prop({ default: 1 })
    level?: number; // Only for children

    @Prop({ default: 0 })
    score?: number; // Only for children
}

export const signupChildSchema = SchemaFactory.createForClass(signupChild);
