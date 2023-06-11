import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUser() {
    return 'it works';
  }

  @Post('signup')
  async signup(@Body() body) {
    return await this.usersService.signup(body);
  }
}
