import { resolve } from 'aurelia';
import { UserNotifiedError } from '../errors/user-notified-error';
import { AppConfigService } from './app-config-service';
import { FindChallengeSolutionRequest } from '../models/dtos/find-challenge-solution-request';
import { FindChallengeSolutionResponse } from '../models/dtos/find-challenge-solution-response';
import { ToastrService } from './toastr-service';

export class ChallengeApiService {
  private readonly appConfigService = resolve(AppConfigService);
  private readonly toastr = resolve(ToastrService);

  public async findSolution(request: FindChallengeSolutionRequest): Promise<FindChallengeSolutionResponse> {
    try {
      const config = await this.appConfigService.getConfig();
      const basePath = this.joinUrl(config.apiEndpoint, 'waterJugChallenge/findSolution');
      const query = new URLSearchParams({
        jug1Capacity: String(request.jug1Capacity),
        jug2Capacity: String(request.jug2Capacity),
        targetAmount: String(request.targetAmount)
      });
      const endpointUrl = `${basePath}?${query.toString()}`;
      const response = await fetch(endpointUrl, {
        method: 'GET'
      });

      if (!response.ok) {
        const body = await response.text().catch(() => '');
        const message = body.trim() || `Failed to fetch solution (${response.status})`;
        this.toastr.error(message);
        throw new UserNotifiedError(message);
      }

      return await response.json() as FindChallengeSolutionResponse;
    } catch (error) {
      if (error instanceof UserNotifiedError) {
        throw error;
      }
      const message =
        error instanceof SyntaxError
          ? 'The server returned invalid JSON.'
          : 'Could not reach the server. Check your connection and API URL.';
      this.toastr.error(message);
      throw new UserNotifiedError(message);
    }
  }

  private joinUrl(baseUrl: string, path: string): string {
    const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
    return `${normalizedBaseUrl}/${normalizedPath}`;
  }
}
