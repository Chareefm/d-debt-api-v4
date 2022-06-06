import { NestFactory } from '@nestjs/core';
import { CommissionModule } from './app.module';

async function bootstrap() {
  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };
  const app = await NestFactory.create(CommissionModule);
  await app.listen(3000);
}
bootstrap();
