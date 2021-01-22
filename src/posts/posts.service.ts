import { Injectable, NotFoundException } from '@nestjs/common';
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
    return await this.postModel
      .aggregate()
      .lookup({
        from: 'groups',
        localField: 'group_id',
        foreignField: '_id',
        as: 'groups',
      })
      .exec();
  }

  async findOne(id: string) {
    let post;
    try {
      post = await this.postModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find post');
    }
    if (!post) {
      throw new NotFoundException('Could not find post');
    }
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.postModel.findById(id).exec();
    if (updatePostDto.text) {
      post.text = updatePostDto.text;
    }
    if (updatePostDto.type) {
      post.type = updatePostDto.type;
    }
    if (updatePostDto.group_id) {
      post.group_id = updatePostDto.group_id;
    }
    if (updatePostDto.date) {
      post.date = updatePostDto.date;
    }
    if (updatePostDto.link) {
      post.link = updatePostDto.link;
    }
    if (updatePostDto.profile_link) {
      post.profile_link = updatePostDto.profile_link;
    }
    if (updatePostDto.profile_name) {
      post.profile_name = updatePostDto.profile_name;
    }
    if (updatePostDto.attachments) {
      post.attachments = updatePostDto.attachments;
    }
    if (updatePostDto.comments) {
      post.comments = updatePostDto.comments;
    }
    post.save();
  }

  async remove(id: string) {
    await this.postModel.deleteOne({ _id: id }).exec();
  }
}
