import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostDocument } from './posts.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<PostDocument>,
  ) {}
  async create(createPostDto: CreatePostDto) {
    const newPost = new this.postModel(createPostDto);
    const result = await newPost.save();
    return result.id as string;
  }

  async findAll() {
    return await this.postModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  async remove(id: string) {
    await this.postModel.deleteOne({ _id: id }).exec();
  }
}
