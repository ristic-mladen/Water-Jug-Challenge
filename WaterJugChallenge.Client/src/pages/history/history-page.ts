import { IStore, type IStoreSubscriber } from '@aurelia/state';
import { resolve } from 'aurelia';
import { ChallengeHistoryItem } from '../../models/challenge-history-item';
import { ChallengeHistoryState } from '../../state/challenge-history-state';

export class HistoryPage implements IStoreSubscriber<ChallengeHistoryState> {
  public history: ChallengeHistoryItem[] = [];
  private readonly store = resolve(IStore) as IStore<ChallengeHistoryState>;

  public binding(): void {
    this.store.subscribe(this);
    this.history = this.store.getState().history;
  }

  public unbinding(): void {
    this.store.unsubscribe(this);
  }

  public handleStateChange(state: ChallengeHistoryState): void {
    this.history = state.history;
  }
}
