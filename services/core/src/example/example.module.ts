import { Module } from '@nestjs/common';
import { ExampleService } from './example.service';
import { ExampleController } from './example.controller';
import { PrismaModule } from '@share/modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}
