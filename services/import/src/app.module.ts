import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@share/modules/prisma/prisma.module';

import { ImportController } from './app.controller';
import { ImportService } from './app.service';
import { TeamsModule } from './teams/teams.module';
import { TodoModule } from './todo/service/todo.module';
import { TodoController } from './tod/controller/todo.controller';
import configs from './configs';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configs] }),
    TeamsModule,
    TodoModule,
  ],
  controllers: [ImportController, TodoController],
  providers: [ImportService],
})
export class ImportModule {}
