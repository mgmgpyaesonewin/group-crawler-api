import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Group {
  @Prop()
  name: string;

  @Prop()
  url: string;

  @Prop({ default: 'https://dummyimage.com/600x400/000/fff&text=Image' })
  picture_url: string;

  @Prop({ type: SchemaTypes.Boolean, default: true })
  is_public: boolean;

  @Prop({ type: SchemaTypes.ObjectId, required: true })
  industry_id: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
