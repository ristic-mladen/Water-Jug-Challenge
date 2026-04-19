import { bindable } from 'aurelia';
import { ChallengeHistoryItem } from '../../models/challenge-history-item';

export class HistoryList {
  @bindable public items: ChallengeHistoryItem[] = [];
}
