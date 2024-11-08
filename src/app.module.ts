import { Module } from '@nestjs/common';
import { ChatModule } from './domains/chat/chat.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from './domains/auth/auth.module';

@Module({
  imports: [
    ChatModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
