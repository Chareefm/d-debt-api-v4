import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ImportService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as papa from 'papaparse';

@Controller('import')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File): Promise<any> {
    const foo = papa.parse(file.buffer.toString('utf8'), {
      delimiter: '|',
      header: true,
      skipEmptyLines: true,
    });
    const result = await this.importService.saveToDb(foo.data);
    return { result };
  }

  @Post('/debt_address')
  @UseInterceptors(FileInterceptor('file'))
  async debt_address(@UploadedFile() file: Express.Multer.File): Promise<any> {
    const debt_address = papa.parse(file.buffer.toString('utf8'), {
      delimiter: '|',
      header: true,
      skipEmptyLines: true,
    });  
    const result = await this.importService.savedebt_Address(debt_address.data);
    return { result };
  }

  @Post('/cob')
  @UseInterceptors(FileInterceptor('file'))
  async cob(@UploadedFile() file: Express.Multer.File): Promise<any> {
    const cob = papa.parse(file.buffer.toString('utf8'), {
      delimiter: '|',
      header: true,
      skipEmptyLines: true,
    });
    const result = await this.importService.saveCob(cob.data);
    return { result };
  }

  @Post('/trn')
  @UseInterceptors(FileInterceptor('file'))
  async trn(@UploadedFile() file: Express.Multer.File): Promise<any> {
    const trn = papa.parse(file.buffer.toString('utf8'), {
      delimiter: '|',
      header: true,
      skipEmptyLines: true,
    });
    const result = await this.importService.saveTrn(trn.data);
    return { result };
  }

  @Post('/cus')
  @UseInterceptors(FileInterceptor('file'))
  async cus(@UploadedFile() file: Express.Multer.File): Promise<any> {
    const cus = papa.parse(file.buffer.toString('utf8'), {
      delimiter: '|',
      header: true,
      skipEmptyLines: true,
    });
    const result = await this.importService.saveCus(cus.data);
    return { result };
  }

  @Post('/cus_address')
  @UseInterceptors(FileInterceptor('file'))
  async cus_address(@UploadedFile() file: Express.Multer.File): Promise<any> {
    const cus_address = papa.parse(file.buffer.toString('utf8'), {
      delimiter: '|',
      header: true,
      skipEmptyLines: true,
    });  
    const result = await this.importService.savecus_Address(cus_address.data);
    return { result };
  }

  @Post('/odt')
  @UseInterceptors(FileInterceptor('file'))
  async odt(@UploadedFile() file: Express.Multer.File): Promise<any> {
    const odt = papa.parse(file.buffer.toString('utf8'), {
      delimiter: '|',
      header: true,
      skipEmptyLines: true,
    });  
    const result = await this.importService.saveOdt(odt.data);
    return { result };
  }

  @Post('/sod')
  @UseInterceptors(FileInterceptor('file'))
  async sod(@UploadedFile() file: Express.Multer.File): Promise<any> {
    const sod = papa.parse(file.buffer.toString('utf8'), {
      delimiter: '|',
      header: true,
      skipEmptyLines: true,
    });  
    const result = await this.importService.saveSod(sod.data);
    return { result };
  }
}