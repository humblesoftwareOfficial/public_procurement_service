import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DefaultAttributes } from '../shared/default-attributes.entity';
import { ENoticeAwardType } from 'src/features/provisional-notice-award/provisional-notice-award.helper';

export type ProvisionalNoticeAwardDocument = ProvisionalNoticeAward & Document;

@Schema({})
export class ProvisionalNoticeAward extends DefaultAttributes {
  @Prop({ required: true, type: String })
  ref: string;

  @Prop({ required: true, type: String })
  authority: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ type: String, enum: ENoticeAwardType })
  type: string;

  @Prop({ type: Date, required: true })
  publicationDate: Date;

  @Prop({ type: String, required: true })
  publicationLocation: string;

  @Prop({ type: Number, required: true })
  receivedOffers: number;

  @Prop({ type: String, required: true })
  nameOfAssignee: string;

  @Prop({ type: String, required: true })
  addressOfAssignee: string;

  @Prop({ type: Number, required: true })
  offerAmount: number;

  @Prop({ type: String, required: true })
  offerAmountInLetter: string;

  @Prop({ type: String })
  detail?: string;

  @Prop({ type: String })
  method: string;

  @Prop({ type: Number })
  delay: number;

  @Prop({ type: Date })
  limitDate: Date;
}

export const ProvisionalNoticeAwardSchema = SchemaFactory.createForClass(ProvisionalNoticeAward);
