import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DefaultAttributes } from '../shared/default-attributes.entity';

export type EventDocument = Event & Document;

@Schema({})
export class Event extends DefaultAttributes {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ type: [] })
  description: any;

  @Prop({ type: String })
  image: string;

  @Prop({ type: String })
  date: string;

}

export const EventSchema = SchemaFactory.createForClass(Event);
