import { Module } from '@nestjs/common';
import { CommissionService } from './app.service';
import { CommissionController } from './app.controller';

@Module({
  controllers: [CommissionController],
  providers: [CommissionService],
})
export class CommissionModule {}
