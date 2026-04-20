import { IActionHandler } from '@aurelia/state';
import { ChallengeHistoryItem } from '../models/challenge-history-item';
import { ChallengeHistoryActionTypes } from './state-consts';

export interface ChallengeHistoryState {
  history: ChallengeHistoryItem[];
}

export interface AddHistoryEntryAction {
  type: typeof ChallengeHistoryActionTypes.AddHistoryEntry;
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
  if (typedAction.type !== ChallengeHistoryActionTypes.AddHistoryEntry) {
    return state;
  }

  return {
    ...state,
    history: [typedAction.entry, ...state.history].slice(0, 10)
  };
};
