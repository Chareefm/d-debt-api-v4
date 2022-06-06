import { Injectable } from '@nestjs/common';
import { PrismaService } from '@share/modules/prisma/prisma.service';
import { TQueryClient } from '@share/modules/prisma/types';

@Injectable()
export class PrismaTransactionService {
  constructor(private db: PrismaService) {}

  async execute<T>(
    func: (prisma?: TQueryClient) => Promise<T>,
    option?: { prisma?: TQueryClient },
  ) {
    const result = await this.db.$transaction((prisma) =>
      func(option?.prisma ?? prisma),
    );
    return result as T;
  }
}
