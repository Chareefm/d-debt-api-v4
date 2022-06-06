import { Injectable } from '@nestjs/common';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { OARepository } from '@share/repositories/OA.repository';
import { PrismaTransactionService } from '@share/modules/prisma/prisma-transaction.service';
@Injectable()
export class ExampleService {
  constructor(
    private oaRepo: OARepository,
    private transaction: PrismaTransactionService,
  ) {}

  create(createExampleDto: CreateExampleDto) {
    return createExampleDto;
  }

  findAll() {
    return [];
  }

  findOne(id: number) {
    return { id };
  }

  update(id: number, updateExampleDto: UpdateExampleDto) {
    return { id, updateExampleDto };
  }

  remove(id: number) {
    return { id };
  }
}
