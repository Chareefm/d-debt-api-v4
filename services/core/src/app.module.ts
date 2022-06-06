import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CoreController } from './app.controller';
import { CoreService } from './app.service';
import configs from './configs';
import { ExampleModule } from './example/example.module';

@Module({
  imports: [
    ExampleModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configs] }),
  ],
  controllers: [CoreController],
  providers: [CoreService],
})
export class CoreModule {}
