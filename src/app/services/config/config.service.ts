import { Injectable } from '@angular/core';
import { Config } from 'src/app/interfaces/config.interface';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  config: Config;

  constructor() {
    this.config = (<any>window).CONFIG;
  }

  getPostsUrl(): string {
    return this.config?.postsUrl;
  }
}
