import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import express from 'express';
import hbs from 'hbs';
import { join } from 'path';
import { appConfig } from '~configs/root-path.config';
import { validateConfig } from '~configs/validate.config';
import { AppModule } from '../app.module';
import { SwaggerConfig } from './types/swagger.type';

export class Bootstrap {
  private app: NestExpressApplication;
  private configService: ConfigService;

  async initApp() {
    this.app = await NestFactory.create<NestExpressApplication>(AppModule);
    this.configService = this.app.get(ConfigService);
  }

  enableCors() {
    this.app.enableCors();
  }

  setupMiddleware() {
    this.app.use(express.json({ limit: '1000kb' }));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(compression());
  }

  setupGlobalPipe() {
    this.app.useGlobalPipes(validateConfig);
  }

  async startApp() {
    const port = this.configService.get<number>('port');
    await this.app.listen(port);
    return port;
  }

  setupSwagger() {
    const { title, description, version, tag } = this.configService.get<SwaggerConfig>('swagger');
    const config = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .addTag(tag)
      .build();
    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup('api', this.app, document);
  }

  initVewEngine() {
    const projectDir = join(appConfig.rootPath, '..');
    const viewDir = join(projectDir, 'views');
    this.app.setViewEngine('hbs');
    this.app.set('view options', { layout: 'layouts/default' });
    this.app.useStaticAssets(join(projectDir, 'public'));
    this.app.setBaseViewsDir(viewDir);
    hbs.registerPartials(`${viewDir}/partials`);
  }
}
