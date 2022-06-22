import cors from 'cors';
import express, { Application, Express } from 'express';
import helmet from 'helmet';
import http from 'http';
import pinoHttp from 'pino-http';

import logger from '~/src/logger';

import { routerCrytocurrency } from '@src/routes/cryptocurrency';
import { routerCurrency } from '@src/routes/currency';

export class Server {
  private server?: http.Server;
  private app: Express;

  constructor(private port = 3333) {
    this.app = express();
    this.server = http.createServer(this.app);
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupRoutes();
  }

  private setupExpress(): void {
    this.app.use(
      pinoHttp({
        quietReqLogger: true,
        transport: {
          target: 'pino-http-print',
          options: {
            all: true,
            colorize: true,
            translateTime: 'yyyy-dd-mm, h:MM:ss TT',
          },
        },
      }),
    );
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(
      cors({
        origin: '*',
      }),
    );
  }

  private setupRoutes() {
    this.app.use('/currencies', routerCurrency);
    this.app.use('/cryptocurrencies', routerCrytocurrency);
  }

  public getApp(): Application {
    return this.app;
  }

  public async close(): Promise<void> {
    if (this.server) {
      await new Promise((resolve, reject) => {
        this.server?.close(err => {
          if (err) {
            return reject(err);
          }
          resolve(true);
        });
      });
    }
  }

  public start(): void {
    this.server?.listen(this.port, () => {
      logger.info('Server listening on port: ' + this.port);
    });
  }
}
