import {
  Injectable,
  OnModuleInit,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnApplicationShutdown {
  private readonly redis = new Redis({
    port: this.configService.get('redis_port'),
    host: this.configService.get('redis_host'),
    family: 4, // 4 (IPv4) or 6 (IPv6)
    db: 0,
  });

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.redis.on('connect', () => {
      console.log('Redis connected');
    });
    this.redis.on('error', (e) => console.log(e));
    this.redis.on('close', () => console.log('Redis connection closed...'));
    this.redis.on('reconnecting', () => console.log('Redis reconnecting...'));
  }

  async onApplicationShutdown() {
    this.redis.disconnect();
  }

  getClient(): Redis {
    return this.redis;
  }
}
