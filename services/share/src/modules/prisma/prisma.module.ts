import { Module } from '@nestjs/common';
import { OARepository } from '@share/repositories/OA.repository';
import { PrismaTransactionService } from './prisma-transaction.service';

import { PrismaService } from './prisma.service';

const services = [PrismaService, PrismaTransactionService, OARepository];
@Module({
  providers: [...services],
  exports: [...services],
})
export class PrismaModule {}
