import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { User } from './user.schema';

export type LinkDocument = HydratedDocument<Link>

@Schema()
export class Link {
  @Prop({ required: true })
  oldLink: string;

  @Prop()
  newLink: string;

  @Prop({ required: false })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: User;

}

export const LinkSchema = SchemaFactory.createForClass(Link)