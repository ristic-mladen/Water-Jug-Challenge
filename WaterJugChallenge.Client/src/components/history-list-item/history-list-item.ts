import { bindable, containerless } from 'aurelia';
import { ChallengeHistoryItem } from '../../models/challenge-history-item';
import { TICK_SIGNAL } from '../../common/constants';

@containerless
export class HistoryListItem {
  @bindable public item: ChallengeHistoryItem;
  public isExpanded: boolean;
  readonly tickSignal = TICK_SIGNAL;

  toggleRow() {
    if (this.item.steps.length > 0)
      this.isExpanded = !this.isExpanded;
  }
}
