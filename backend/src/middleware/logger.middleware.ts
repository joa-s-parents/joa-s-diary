import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, baseUrl, body } = req;

    res.on('close', () => {
      const { statusCode } = res;

      this.logger.log(
        `[${method}]${baseUrl} statusCode=${statusCode} ${
          Object.keys(body).length > 0 ? 'body=' + JSON.stringify(body) : ''
        }`,
      );
    });

    next();
  }

  resolve(name: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      console.log(`[middleware:logger] ${name}: ${req.method} ${req.url}`);
      next();
    };
  }
}
