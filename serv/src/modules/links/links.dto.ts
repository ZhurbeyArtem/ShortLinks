import { IsUrl, IsNotEmpty, IsOptional } from 'class-validator'

export class linksDto {
  @IsUrl(undefined, { message: 'Write correct url' })
  @IsNotEmpty()
  link: string;

  userId: string;

  @IsOptional()
  description?: string;
}