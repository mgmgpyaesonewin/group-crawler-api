import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public url: string;

  @Column()
  public picture_url: string;

  @Column()
  public group_category: string;

  @Column()
  public group_type: string;
}