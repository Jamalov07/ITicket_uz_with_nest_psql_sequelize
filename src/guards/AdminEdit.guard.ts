import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class AdminEditGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeaders = request.headers.authorization;
    if (!authHeaders) {
      throw new UnauthorizedException('Admin umuman authorized');
    }
    const bearer = authHeaders.split(' ')[0];
    const token = authHeaders.split(' ')[1];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Admin not authorized');
    }
    async function validate(token: string, jwtService: JwtService) {
      const adminData = await jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
      if (!adminData) {
        throw new UnauthorizedException('admin not authorized func1');
      }
      console.log(adminData);
      if (adminData.is_creator) {
        return true;
      }
      if (!adminData.is_active) {
        throw new BadRequestException('admin not active');
      }
      if (adminData.sub !== Number(request.params.id)) {
        throw new BadRequestException('Admin cannot edit or delete this admin');
      }
      return true;
    }
    return validate(token, this.jwtService);
  }
}

// sub: adminId,
// login,
// is_active,
// is_creator,
