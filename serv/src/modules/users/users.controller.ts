import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersDto } from './users.dto';
import { auth } from './user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @UsePipes(ValidationPipe)
  @Post('/registration')
  registration(@Body() body: usersDto): Promise<auth> {
    return this.userService.registration(body)
}

@Post('/login')
login(@Body() body: usersDto): Promise<auth> {
  return this.userService.login(body)
}

}
