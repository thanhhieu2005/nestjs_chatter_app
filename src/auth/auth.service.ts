import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from 'src/users/entities/user.entity';
import { TokenPayload } from './strategies/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, response: Response) {
    try {
      const expires = new Date();
      expires.setSeconds(
        expires.getSeconds() + this.configService.getOrThrow('JWT_EXPIRATION'),
      );

      const tokenPayload: TokenPayload = {
        _id: user._id.toHexString(),
        email: user.email,
      };

      const token = this.jwtService.sign(tokenPayload);
      response.cookie('accessToken', token, {
        httpOnly: true,
        expires,
      });
    } catch (error) {
      console.error('Error during login:', error);
      throw new Error('Authentication failed');
    }
  }

  logout(response: Response) {
    response.clearCookie('accessToken', {
      httpOnly: true,
      expires: new Date(),
    });
  }
}
