import { bindable, containerless } from 'aurelia';
import { ChallengeHistoryItem } from '../../models/challenge-history-item';

@containerless
export class HistoryListItem {
  @bindable public item: ChallengeHistoryItem;
  public isExpanded: boolean;

  toggleRow() {
    if (this.item.steps.length > 0)
      this.isExpanded = !this.isExpanded;
  }
}
