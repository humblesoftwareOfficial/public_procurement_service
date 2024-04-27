import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DefaultAttributes } from '../shared/default-attributes.entity';

export type BusinessOpportunityDocument = BusinessOpportunity & Document;

@Schema({})
export class BusinessOpportunity extends DefaultAttributes {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ type: [] })
  description: any;

  @Prop({ type: String })
  image: string;

  @Prop({ type: String })
  text: any;
}

export const BusinessOpportunitySchema = SchemaFactory.createForClass(BusinessOpportunity);
