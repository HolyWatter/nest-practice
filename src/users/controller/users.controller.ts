import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUser() {
    return 'it works';
  }

  @Post('signup')
  signup(@Body() body) {
    console.log(body);
  }
}
