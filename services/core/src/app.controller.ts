import { Controller, UseFilters, Get } from '@nestjs/common';
import { AppErrorExceptionFilter } from '@share/errors/app-error.filter';
import { CoreService } from './app.service';
@UseFilters(AppErrorExceptionFilter)
@Controller('core')
export class CoreController {
  constructor(private readonly coreService: CoreService) {}

  @Get('/health')
  checkHealth() {
    return { uptime: process.uptime() };
  }
}
