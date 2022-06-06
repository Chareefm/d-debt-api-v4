import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { Data } from '@prisma/client';
import { TeamsService } from './app.service';
@Controller('')
export class TeamsController {
  constructor(private readonly todoService: TeamsService) {}
  @Get('getAll')
  async getAllTeams(): Promise<Data[]> {
    return this.todoService.getAllTeams();
  }
  @Post('addNew')
  async createTeams(@Body() postData: Data): Promise<Data> {
    return this.todoService.createTeams(postData);
  }
  @Get('getOne/:id')
  async getTeams(@Param('id') id: number): Promise<Data | null> {
    return this.todoService.getTeams(id);
  }
  @Put('update/:id')
  async Update(@Param('id') id: number, @Body() updateData: Data): Promise<Data> {
    return this.todoService.updateTeams(id,updateData);
  }
  @Delete('delete/:id')
  async Delete(@Param('id') id: number): Promise<Data> {
    return this.todoService.deleteTeams(id);
  }
}
