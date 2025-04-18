import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConfig } from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import { AppConfig } from './config/app.config';
import { SignupChildModule } from './modules/signup-child/signup-child.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig],
      cache: true 
    }),
    AuthModule,
    MongooseModule.forRoot(process.env.DB_URI),
    SignupChildModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
