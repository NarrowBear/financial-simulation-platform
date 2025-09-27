import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class JwtAdvancedFilter implements NestInterceptor {
    constructor(private readonly jwtService: JwtService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        console.log('JWT Advanced Filter - Processing request with auth header:', authHeader);

        // 解析Authorization头
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            
            try {
                // 解析JWT token
                const decoded = this.jwtService.verify(token);
                console.log('JWT Advanced Filter - Decoded token:', decoded);
                
                // 检查token是否过期
                const currentTime = Math.floor(Date.now() / 1000);
                if (decoded.exp && decoded.exp < currentTime) {
                    throw new UnauthorizedException('Token has expired');
                }

                // 检查token是否即将过期（1小时内）
                const oneHour = 3600;
                const isExpiringSoon = decoded.exp && (decoded.exp - currentTime) < oneHour;
                
                // 将解析后的用户信息添加到请求对象
                request.user = {
                    ...decoded,
                    isExpiringSoon,
                    tokenType: 'Bearer'
                };
                request.token = token;
                request.isAuthenticated = true;
                request.tokenInfo = {
                    issuedAt: new Date(decoded.iat * 1000),
                    expiresAt: new Date(decoded.exp * 1000),
                    isExpiringSoon
                };
                
                console.log('JWT Advanced Filter - User authenticated:', {
                    phone: decoded.phone,
                    userUin: decoded.userUin,
                    isExpiringSoon
                });
                
            } catch (error) {
                console.log('JWT Advanced Filter - Token verification failed:', error.message);
                
                if (error.name === 'TokenExpiredError') {
                    request.tokenError = 'Token has expired';
                } else if (error.name === 'JsonWebTokenError') {
                    request.tokenError = 'Invalid token format';
                } else {
                    request.tokenError = error.message;
                }
                
                request.isAuthenticated = false;
                request.user = null;
                request.token = null;
            }
        } else {
            console.log('JWT Advanced Filter - No valid Authorization header found');
            request.isAuthenticated = false;
            request.tokenError = 'No valid Authorization header';
            request.user = null;
            request.token = null;
        }

        return next.handle().pipe(
            tap(() => {
                console.log('JWT Advanced Filter - Request completed successfully');
            }),
            catchError((error) => {
                console.log('JWT Advanced Filter - Request failed:', error.message);
                return throwError(() => error);
            })
        );
    }
}
