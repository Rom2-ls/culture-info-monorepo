import { Module } from '@nestjs/common';
import { ChatModule } from './domains/chat/chat.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ChatModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
