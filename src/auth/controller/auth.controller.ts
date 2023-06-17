import { Body, Controller, Get, Headers, Post, Query } from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body) {
    return this.authService.login(body);
  }

  @Post('token')
  checkToken(@Headers() headers) {
    const { authorization } = headers;

    this.authService.checkToken(authorization);
  }

  @Get('naverlogin')
  async naverlogin(@Query('token') token) {
    const accessToken = await this.authService.naverlogin(token);

    return accessToken;
  }
}
