import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({minlength: 8, required: true})
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User)