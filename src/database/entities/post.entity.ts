import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('posts')
class Post {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public text: string;

  @Column()
  public type: string;

  @Column('timestamp')
  public posted_date: Date;

  @Column()
  public link: string;

  @Column()
  public profile_name: string;

  @Column()
  public profile_link: string;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}

export default Post;
