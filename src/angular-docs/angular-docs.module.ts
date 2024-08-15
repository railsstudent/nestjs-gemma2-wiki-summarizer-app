import { Module } from '@nestjs/common';
import { AngularDocsService } from './application/angular-docs.service';

@Module({
  providers: [AngularDocsService],
  exports: [AngularDocsService],
})
export class AngularDocsModule {}
