import { Injectable } from '@nestjs/common';
import { Data, Prisma } from '@prisma/client';
import { PrismaService } from '@share/modules/prisma/prisma.service';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}
  async getAllTeams(): Promise<Data[]> {
    return this.prisma.todo.findMany();
  }
  async getTeams(id: number): Promise<Data | null> {
    return this.prisma.todo.findUnique({ where: { id: Number(id) } });
  }
  async createTeams(data: Data): Promise<Data> {
    return this.prisma.todo.create({
      data,
    });
  }
  async updateTeams(id: number, updateData: Data): Promise<Data> {
    return this.prisma.todo.update({
      where: { id: Number(id) },
      data: updateData,
    });
  }
  async deleteTeams(id: number): Promise<Data> {
    return this.prisma.todo.delete({
      where: { id: Number(id) },
    });
  }
}
