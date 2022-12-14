import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const cookieGetter = createParamDecorator(
  async (data: 'refresh_token', context: ExecutionContext): Promise<string> => {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.cookies[data];
    if (!refreshToken) {
      throw new UnauthorizedException('admin unauthorized decorator');
    }
    return refreshToken;
  },
);
