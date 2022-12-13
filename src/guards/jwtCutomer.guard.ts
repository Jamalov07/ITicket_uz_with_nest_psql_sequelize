import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class CustomerGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeaders = request.headers.authorization;
    if (!authHeaders) {
      throw new UnauthorizedException('customer umuman authorized');
    }
    const bearer = authHeaders.split(' ')[0];
    const token = authHeaders.split(' ')[1];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('customer not authorized');
    }
    async function validate(token: string, jwtService: JwtService) {
      const customerData = await jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
      if (!customerData) {
        throw new UnauthorizedException('customer not authorized func1');
      }
      console.log(customerData);
      if (!customerData.sub) {
        throw new BadRequestException('customer not active');
      }
      return true;
    }
    return validate(token, this.jwtService);
  }
}

// sub: customerId,
// login,
// is_active,
// is_creator,
