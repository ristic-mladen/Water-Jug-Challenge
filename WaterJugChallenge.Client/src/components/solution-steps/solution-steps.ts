import { bindable } from 'aurelia';
import { ChallengeSolutionStep } from '../../models/challenge-solution-step';

export class SolutionSteps {
  @bindable public targetAmount: number;
  @bindable public steps: ChallengeSolutionStep[] = [];
}
