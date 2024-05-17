import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Lot {
  @Prop({ type: String, required: true })
  number: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  nameOfAssignee: string;

  @Prop({ type: String, required: true })
  addressOfAssignee: string;

  @Prop({ type: Number, required: true })
  offerAmount: number;

  @Prop({ type: String, required: true })
  offerAmountInLetter: string;

  @Prop({ type: String })
  currency: string;
}

@Schema({ _id: false })
export class GeneralLot {
  @Prop({ type: String, required: true })
  number: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  financialExigences: string;
}
