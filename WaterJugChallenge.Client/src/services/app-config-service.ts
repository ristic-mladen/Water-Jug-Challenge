import { resolve } from 'aurelia';
import { UserNotifiedError } from '../errors/user-notified-error';
import { ToastrService } from './toastr-service';

export interface AppConfig {
  apiEndpoint: string;
}

export class AppConfigService {
  private readonly toastr = resolve(ToastrService);
  private configPromise: Promise<AppConfig> | null = null;

  public getConfig(): Promise<AppConfig> {
    if (this.configPromise !== null) {
      return this.configPromise;
    }

    this.configPromise = this.loadConfig();
    return this.configPromise;
  }

  private async loadConfig(): Promise<AppConfig> {
    try {
      const response = await fetch('/config.json');
      if (!response.ok) {
        const message = 'Unable to load config.json';
        this.toastr.error(message);
        throw new UserNotifiedError(message);
      }

      const config = await response.json() as Partial<AppConfig>;
      const apiEndpoint = config.apiEndpoint?.trim();

      if (!apiEndpoint) {
        const message = 'Missing "apiEndpoint" in config.json';
        this.toastr.error(message);
        throw new UserNotifiedError(message);
      }

      return { apiEndpoint };
    } catch (error) {
      if (error instanceof UserNotifiedError) {
        throw error;
      }
      const message = 'Unable to load application configuration.';
      this.toastr.error(message);
      throw new UserNotifiedError(message);
    }
  }
}
