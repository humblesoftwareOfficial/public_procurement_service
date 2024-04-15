import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DefaultAttributes } from '../shared/default-attributes.entity';
import { EProcurementType } from 'src/features/procurement-plan/procurement-plan.helper';

export type GeneralNoticeDocument = GeneralNotice & Document;

@Schema({})
export class GeneralNotice extends DefaultAttributes {
  @Prop({ required: true, type: String })
  authority: string;

  @Prop({ required: true, type: String })
  ref: string;

  @Prop({ type: String })
  realization: string;

  @Prop({ type: String })
  method: string;

  @Prop({ type: String, enum: EProcurementType })
  type: string;

  @Prop({ type: Date })
  publicationDate: Date;

  @Prop({ type: String, required: true })
  publicationRef: String;

  @Prop({ type: String, required: true })
  publicationNumber: string;

  @Prop({ type: Number, required: true })
  duration: number;

  @Prop({ type: Date })
  limitDate: Date;

  @Prop({ type: String })
  financialCapacity?: string;

  @Prop({ type: String })
  technicalCapacity?: string;

  @Prop({ type: String })
  experience?: string;
}

export const GeneralNoticeSchema = SchemaFactory.createForClass(GeneralNotice);
