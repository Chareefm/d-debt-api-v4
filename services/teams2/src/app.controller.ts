import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete
} from '@nestjs/common';
import { TodoService } from './app.service'
import {ITodo} from './utils/todo.interface'
@Controller('teams')
export class ImportController {
  constructor (private todoService:TodoService){}

  @Post('')
  async postTodo(
    @Body() userData: ITodo ,
  ) : Promise<any> {
    const result = await this.todoService.addToDb(userData);
    return { result };
  } 
  @Get()
  findAll() {
    return this.todoService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string): any {
    return this.todoService.findOne(+id);
  }
  @Delete(':id')
  remove(@Param('id') id: string): any {
    return this.todoService.remove(+id);
  }
}