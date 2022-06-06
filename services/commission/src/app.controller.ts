import { Controller } from '@nestjs/common';
import { CommissionService } from './app.service';

@Controller('commission')
export class CommissionController {
  constructor(private readonly commissionService: CommissionService) {}
}
