import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IndustryDocument = Industry & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Industry {
  @Prop()
  name: string;
}

export const IndustrySchema = SchemaFactory.createForClass(Industry);
