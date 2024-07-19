import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../src/users/users.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') { // local is default,we could ommit
  constructor(private readonly usersService: UsersService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {

    try {
      return this.usersService.verifyUser(email, password);
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }

  }
}
