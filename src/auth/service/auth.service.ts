import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/users/repository/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '../jwt/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async login(loginInfo) {
    const { password, email } = loginInfo;

    const user = await this.usersRepository.findEmail(email);

    if (!user) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    const payload: Payload = {
      email: email,
      sub: user.id,
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: '2h',
      }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
    };
  }

  async checkToken(authorization: string) {
    const token = authorization.split('Bearer ')[1];

    const isValidToken = this.jwtService.verify(token);

    if (isValidToken) {
      const payload: Payload = {
        email: isValidToken.email,
        sub: isValidToken.sub,
      };
      return {
        accessToken: this.jwtService.sign(payload, {
          expiresIn: '2h',
        }),
        refreshToken: this.jwtService.sign(payload, {
          expiresIn: '7d',
        }),
      };
    } else {
      throw new UnauthorizedException('로그인이 필요합니다.');
    }
  }

  async naverlogin(user) {
    const info = await this.usersRepository.findEmail(user.email);
    if (!info) {
      const res = await this.usersRepository.signup({
        email: user.email,
        password: '',
        nickname: user.name,
      });
    }
    const findUser = await this.usersRepository.findEmail(user.Email);

    const payload = {
      email: findUser.email,
      sub: findUser.id,
    };
    return this.signJWT(payload);
  }

  async signJWT(payload) {
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: '2h',
      }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
    };
  }
}
