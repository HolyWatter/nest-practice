import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUser() {
    return 'it works';
  }

  @Post('signup')
  async signup(@Body() body) {
    return await this.usersService.signup(body);
  }
}
