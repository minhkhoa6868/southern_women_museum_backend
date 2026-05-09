import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const authResult = super.canActivate(context);

    const checkUserIsAdmin = () => {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      return !!user?.isAdmin;
    };

    if (authResult instanceof Promise) {
      return authResult.then((isAuthenticated) => isAuthenticated && checkUserIsAdmin());
    }

    return authResult && checkUserIsAdmin();
  }
}