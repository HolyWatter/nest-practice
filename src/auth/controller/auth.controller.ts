import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { NaverAuthGuard } from '../naver/naver.auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { rejects } from 'assert';

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
  @UseGuards(AuthGuard('naver'))
  naverlogin(@Req() req, @Res() res) {
    return this.authService.naverlogin(req.user);
  }
}
