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

    this.readAWSConfig = false;
  };
}
