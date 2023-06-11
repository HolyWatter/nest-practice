import { Body, Controller, Headers, Post } from '@nestjs/common';
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
  }
}
