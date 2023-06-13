import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() body) {
    return await this.usersService.signup(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getCurrentUser(@Req() req) {
    return await this.usersService.getCurrentUser({ email: req.user.email });
  }
}
