import { IActionHandler } from '@aurelia/state';

export type BucketKey = 'jug1' | 'jug2';

export interface BucketColorsState {
  jug1Color: string;
  jug2Color: string;
  activePicker: BucketKey | null;
}

export interface SetActiveColorPickerAction {
  type: 'set-active-color-picker';
  bucket: BucketKey | null;
}

export interface SetBucketColorAction {
  type: 'set-bucket-color';
  bucket: BucketKey;
  color: string;
}

export type BucketColorsAction = SetActiveColorPickerAction | SetBucketColorAction;

export const initialBucketColorsState: BucketColorsState = {
  jug1Color: '#3b82f6',
  jug2Color: '#22c55e',
  activePicker: null
};

export const bucketColorsActionHandler: IActionHandler<BucketColorsState> = (state, action) => {
  const typedAction = action as BucketColorsAction;

  if (typedAction.type === 'set-active-color-picker') {
    return {
      ...state,
      activePicker: typedAction.bucket
    };
  }

  if (typedAction.type === 'set-bucket-color') {
    return {
      ...state,
      jug1Color: typedAction.bucket === 'jug1' ? typedAction.color : state.jug1Color,
      jug2Color: typedAction.bucket === 'jug2' ? typedAction.color : state.jug2Color,
      activePicker: null
    };
  }

  return state;
};
