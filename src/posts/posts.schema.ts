import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Post {
  @Prop()
  profile_name: string;

  @Prop()
  profile_link: string;

  @Prop()
  link: string;

  @Prop()
  date: Date;

  @Prop({ type: SchemaTypes.ObjectId, required: true })
  group_id: string;

  @Prop()
  type: string;

  @Prop()
  text: string;

  @Prop()
  attachments: [string];

  @Prop()
  comments: [
    {
      name: string;
      text: string;
    },
  ];
}

export const PostSchema = SchemaFactory.createForClass(Post);
