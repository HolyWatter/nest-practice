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

  async naverlogin(token: string) {
    const getUser = await fetch('https://openapi.naver.com/v1/nid/me', {
      headers: {
        'User-Agent':
          'curl/7.12.1 (i686-redhat-linux-gnu) libcurl/7.12.1 OpenSSL/0.9.7a zlib/1.2.1.2 libidn/0.5.6',
        Host: 'openapi.naver.com',
        Pragma: 'no-cache',
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => res.response);
    let user = await this.usersRepository.findEmail(getUser.email);
    if (!user) {
      user = await this.usersRepository.signup({
        email: getUser.email,
        password: '',
        nickname: getUser.name,
      });
    }

    const payload = {
      email: user.email,
      sub: user._id,
    };

    return await this.signJWT(payload);
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
