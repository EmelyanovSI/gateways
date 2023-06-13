import 'reflect-metadata';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { connect, connection, set } from 'mongoose';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { dbConnection } from '@database';
import { Routes } from '@interfaces/routes.interface';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import { Default, Env, GATEWAYS } from '@constants';
import { GatewayModel } from '@models/gateway.model';

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || Env.Development;
    this.port = PORT || Default.PORT;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    set('strictQuery', true);
    if (this.env !== Env.Production) {
      set('debug', true);
    }

    connect(dbConnection.url)
      .then(() => {
        logger.info('The database is connected.');
      })
      .then(() => {
        return GatewayModel.deleteMany({});
      })
      .then(() => {
        const savePromises = GATEWAYS.map((gateway) => new GatewayModel(gateway).save());
        return Promise.all(savePromises);
      })
      .then(() => {
        logger.info('Default gateways added successfully');
      })
      .catch((error: Error) => {
        logger.error(`Unable to connect to the database: ${error}.`);
      });

    process.once('SIGUSR2', () => connection.close(() => process.kill(process.pid, 'SIGUSR2')));
    process.on('SIGTERM', () => connection.close(() => process.exit()));
    process.on('SIGINT', () => connection.close(() => process.exit()));
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
