import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IndustryDocument = Industry & Document;

@Schema()
export class Industry {
  @Prop()
  name: string;
}

export const IndustrySchema = SchemaFactory.createForClass(Industry);
