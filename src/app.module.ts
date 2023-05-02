import 'dotenv/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '@/shared/interceptor/logging.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import mysql from '@/config/database/mysql';
import { UsersModule } from '@/modules/users/users.module';
import { LoggerModule } from '@/config/logger/logger.module';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { AuthModule } from './modules/auth/auth.module';
import { ApiKeyMiddleware } from '@/shared/middlewares/api-key.middleware';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { TransformInterceptor } from '@/shared/interceptor/transform.interceptor';

@Module({
  imports: [
    //TypeOrmModule.forRoot(mysql),
    //LoggerModule,
    //UsersModule,
    //AuthModule,
    //RolesModule,
    //PermissionsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('*');
  }
}
