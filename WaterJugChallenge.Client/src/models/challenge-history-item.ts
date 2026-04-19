import { FindChallengeSolutionRequest } from './dtos/find-challenge-solution-request';
import { ChallengeSolutionStep } from './challenge-solution-step';

export interface ChallengeHistoryItem extends FindChallengeSolutionRequest {
  id: string;
  requestedAt: string;
  jug1Color: string;
  jug2Color: string;
  steps: ChallengeSolutionStep[];
}
