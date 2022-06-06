import { PrismaService } from '@share/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '@share/modules/prisma/types';
import { OA } from '@prisma/client';

@Injectable()
export class OARepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: number) {
    return this.prisma.oA.findUnique({ where: { id } });
  }

  async create(data: Omit<OA, 'id'>, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.oA.create({ data });
  }

  async updateById(
    { id, data }: { id: number; data: Partial<Omit<OA, 'id'>> },
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.oA.update({ data, where: { id } });
  }
}
