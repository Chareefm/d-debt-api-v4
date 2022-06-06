import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisAdapter } from './redis-adapter.adapter';

export const initRedisAdapter = async (
  app: INestApplication,
  configService: ConfigService,
): Promise<INestApplication> => {
  const redisAdapter = new RedisAdapter(app, configService);
  await redisAdapter.connectToRedis();
  app.useWebSocketAdapter(redisAdapter);

  return app;
};
