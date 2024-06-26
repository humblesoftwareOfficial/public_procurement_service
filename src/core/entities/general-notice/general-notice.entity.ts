import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DefaultAttributes } from '../shared/default-attributes.entity';
import { EProcurementType } from 'src/features/procurement-plan/procurement-plan.helper';
import { GeneralLot } from '../provisional-notice-award/lot.entity';

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
  description: string;

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

  @Prop({ type: Date, default: null })
  limitDate?: Date;

  @Prop({ type: String })
  financialCapacity?: string;

  @Prop({ type: String })
  technicalCapacity?: string;

  @Prop({ type: String })
  experience?: string;

  @Prop({ type: Boolean, default: false })
  isDeferralNotice?: boolean;

  @Prop({ type: Date, default: null })
  referralDate?: Date;

  @Prop({ type: [], default: [] })
  lots: GeneralLot[];

  @Prop({ type: String, default: "" })
  warrantySubmission: string;

  @Prop({ type: String, default: "" })
  warrantyGoodExecution: string;

  @Prop({ type: String, default: "" })
  warrantyDecennial: string;

}

export const GeneralNoticeSchema = SchemaFactory.createForClass(GeneralNotice);
