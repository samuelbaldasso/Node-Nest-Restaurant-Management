import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, StrategyOptionsWithRequest } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    const options: StrategyOptionsWithRequest = {
      clientID: configService.get<string>('google.clientId') || '',
      clientSecret: configService.get<string>('google.clientSecret') || '',
      callbackURL: configService.get<string>('google.callbackUrl') || '',
      scope: ['email', 'profile'],
      passReqToCallback: true,
    };
    super(options);
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, displayName, emails, photos } = profile;
    const email = emails[0].value;

    let user = await this.prisma.user.findUnique({
      where: { googleId: id },
    });

    if (!user) {
      user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (user) {
        user = await this.prisma.user.update({
          where: { id: user.id },
          data: { googleId: id, avatar: photos[0]?.value },
        });
      } else {
        user = await this.prisma.user.create({
          data: {
            googleId: id,
            email,
            name: displayName,
            avatar: photos[0]?.value,
            role: 'CUSTOMER',
          },
        });
      }
    }

    done(null, {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  }
}
