import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readAWSConfig = true;
  private readonly envConfig = {};

  public async get(key: string) {
    if (this.readAWSConfig) {
      this.load();
    }

    return this.envConfig[key];
  }

  public load = () => {
    this.envConfig['PORT'] = process.env.PORT;

    this.envConfig['DB_HOST'] = process.env.DB_HOST;
    this.envConfig['DB_PORT'] = process.env.DB_PORT;
    this.envConfig['DB_USERNAME'] = process.env.DB_USERNAME;
    this.envConfig['DB_PASSWORD'] = process.env.DB_PASSWORD;
    this.envConfig['DB_DATABASE'] = process.env.DB_DATABASE;

    this.readAWSConfig = false;
  };
}
