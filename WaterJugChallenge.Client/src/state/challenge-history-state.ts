import { IActionHandler } from '@aurelia/state';
import { ChallengeHistoryItem } from '../models/challenge-history-item';

export interface ChallengeHistoryState {
  history: ChallengeHistoryItem[];
}

export interface AddHistoryEntryAction {
  type: 'add-history-entry';
  entry: ChallengeHistoryItem;
}

export type ChallengeHistoryAction = AddHistoryEntryAction;

export const initialChallengeHistoryState: ChallengeHistoryState = {
  history: []
};

export const challengeHistoryActionHandler: IActionHandler<ChallengeHistoryState> = (
  state,
  action
) => {
  const typedAction = action as ChallengeHistoryAction;
  if (typedAction.type !== 'add-history-entry') {
    return state;
  }

  return {
    ...state,
    history: [typedAction.entry, ...state.history].slice(0, 10)
  };
};
