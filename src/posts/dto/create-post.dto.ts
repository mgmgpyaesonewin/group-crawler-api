export class CreatePostDto {
  profile_name: string;
  profile_link: string;
  link: string;
  date: Date;
  group_id: string;
  type: string;
  text: string;
  attachments: [string];
  comments: [
    {
      name: string;
      text: string;
    },
  ];
}
