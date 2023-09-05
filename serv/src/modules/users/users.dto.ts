import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class usersDto {
  @IsEmail(undefined, { message: 'Write correct email' })
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  password: string
}