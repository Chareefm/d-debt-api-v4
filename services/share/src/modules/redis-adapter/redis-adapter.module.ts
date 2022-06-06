import { Module } from '@nestjs/common';
import { RedisAdapter } from './redis-adapter.adapter';

@Module({
  providers: [RedisAdapter],
})
export class RedisAdapterModule {}
