import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DefaultAttributes } from '../shared/default-attributes.entity';

export type UserDocument = User & Document;

@Schema({})
export class User extends DefaultAttributes {
  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String, unique: true, sparse: true })
  phone: string;

  @Prop({ type: String, unique: true, sparse: true })
  email: string;

  @Prop({ type: String })
  password?: string;

  @Prop({ type: Boolean, default: false })
  isAdmin?: boolean;

  @Prop({ type: String })
  firstPasswordText?: string;

  @Prop({ type: Boolean })
  isForNewsLetter?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
