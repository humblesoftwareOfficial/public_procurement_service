import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DefaultAttributes } from '../shared/default-attributes.entity';

export type PartnerDocument = Partner & Document;

@Schema({})
export class Partner extends DefaultAttributes {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ required: true, type: String })
  url: string;
}

export const PartnerSchema = SchemaFactory.createForClass(Partner);
