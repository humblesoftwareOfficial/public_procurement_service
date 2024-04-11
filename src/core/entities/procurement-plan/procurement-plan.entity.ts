import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DefaultAttributes } from '../shared/default-attributes.entity';
import { EProcurementType } from 'src/features/procurement-plan/procurement-plan.helper';

export type ProcurementPlanDocument = ProcurementPlan & Document;

@Schema({})
export class ProcurementPlan extends DefaultAttributes {
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
  launchDate: Date;

  @Prop({ type: Date })
  grantDate: Date;
}

export const ProcurementPlanSchema = SchemaFactory.createForClass(ProcurementPlan);
