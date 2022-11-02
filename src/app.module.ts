import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';
import { JwtStrategy } from './user/jwt.strategy';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CartModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'mall',
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    JwtModule.register({
      secret: 'secretOrPrivateKey',
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
