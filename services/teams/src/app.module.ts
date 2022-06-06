import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@share/modules/prisma/prisma.module';
import { TeamsController } from './app.controller';
import { TeamsService } from './app.service';
import configs from './configs';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configs] }),
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class ImportModule {}
