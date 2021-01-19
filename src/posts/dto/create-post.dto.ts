export class CreatePostDto {
  profile_name: string;
  profile_link: string;
  link: string;
  date: Date;
  group: string;
  type: string;
  text: string;
  attachments: Array<string>;
}
