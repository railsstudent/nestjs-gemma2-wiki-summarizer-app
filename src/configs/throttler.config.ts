import { ThrottlerModule } from '@nestjs/throttler';

export const throttlerConfig = ThrottlerModule.forRoot([
  {
    ttl: 60000,
    limit: 10,
  },
]);
