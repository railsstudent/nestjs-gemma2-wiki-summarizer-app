import { appConfig } from '~configs/root-path.config';
import { Bootstrap } from '~core/bootstrap';

async function bootstrap() {
  appConfig.rootPath = __dirname;
  console.log('appConfig.rootPath in bootstrap', appConfig.rootPath);
  const bootstrap = new Bootstrap();
  await bootstrap.initApp();
  bootstrap.enableCors();
  bootstrap.setupMiddleware();
  bootstrap.setupGlobalPipe();
  bootstrap.setupSwagger();
  bootstrap.initVewEngine();
  return bootstrap.startApp();
}

bootstrap()
  .then((port) => console.log(`Application starts at port ${port} successfully.`))
  .catch((err) => console.error(err));
