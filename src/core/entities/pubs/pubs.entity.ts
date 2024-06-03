import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DefaultAttributes } from '../shared/default-attributes.entity';

export type PubsDocument = Pubs & Document;

@Schema({})
export class Pubs extends DefaultAttributes {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ required: true, type: String })
  url: string;

  @Prop({ type: Boolean, default: false })
  isOnNewsletter?: boolean;
}

export const PubsSchema = SchemaFactory.createForClass(Pubs);
