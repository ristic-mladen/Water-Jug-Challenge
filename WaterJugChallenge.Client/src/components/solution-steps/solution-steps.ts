import { bindable } from 'aurelia';
import { ChallengeSolutionStep } from '../../models/challenge-solution-step';

export class SolutionSteps {
  @bindable public steps: ChallengeSolutionStep[] = [];
  @bindable public hasSearched: boolean = false;
}
