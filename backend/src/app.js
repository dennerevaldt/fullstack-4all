import './bootstrap';
import './database';

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import 'express-async-errors';

import routes from './routes';
import StatusError from './errors/status';
import i18n from './config/i18n';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.notFoundHandler();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      express.urlencoded({
        extended: false,
      })
    );
    this.server.use(helmet());
    this.server.use(
      cors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Language'],
      })
    );
    this.server.use(compression());
    this.server.use(i18n.init);
  }

  routes() {
    this.server.use(routes);
  }

  notFoundHandler() {
    this.server.use((req, res, next) => {
      const error = new StatusError(404, res.__('error.notFound'));
      next(error);
    });
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      return res.status(err.statusCode || 500).json({
        error: res.__(err.message) || res.__('error.internalServer')
      });
    });
  }
}

export default new App().server;
