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

  @Prop({ type: Date, required: true })
  launchDate: Date;

  @Prop({ type: Date, required: true })
  grantDate: Date;

  @Prop({ type: Date })
  publicationDate: Date;

  @Prop({ type: String, required: true })
  publicationRef: String;

  @Prop({ type: String, required: true })
  publicationNumber: string;

  // authorité contractante // Avis généraux (c'est le même : ajouter ref de publicationv (date, ref journal , numero journal))

}

export const GeneralNoticeSchema = SchemaFactory.createForClass(GeneralNotice);
