import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GqlAuthGuard } from './auth/guards/gql-auth.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { DatabaseModule } from './common/database/database.module';
import { GraphModule } from './common/graphql/graphql.module';
import { LoggerConfigModule } from './common/logger/logger.module';
import { UsersModule } from './users/users.module';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphModule,
    DatabaseModule,
    LoggerConfigModule,
    UsersModule,
    AuthModule,
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: 'GQL_GUARD', useClass: GqlAuthGuard },
    { provide: 'JWT_GUARD', useClass: JwtAuthGuard },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser).forRoutes('*');
  }
}
