import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { PrismaService } from '@share/modules/prisma/prisma.service';
import helmet from 'helmet';

import { CoreModule } from './app.module';

async function bootstrap() {
  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };
  const app = await NestFactory.create(CoreModule);
  app.enableCors();
  app.use(helmet());

  const configService = app.get(ConfigService);
  const prismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);
  await app.listen(configService.get('port'), () => {
    console.log(`service start on port ${configService.get('port')}...`);
  });
}
bootstrap();
