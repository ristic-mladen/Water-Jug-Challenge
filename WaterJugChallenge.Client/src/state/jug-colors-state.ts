import { IActionHandler } from '@aurelia/state';
import { JugColorsActionTypes } from './state-consts';

export type JugKey = 'jug1' | 'jug2';

export interface JugColorsState {
  jug1Color: string;
  jug2Color: string;
  activePicker: JugKey | null;
}

export interface SetActiveColorPickerAction {
  type: typeof JugColorsActionTypes.SetActiveColorPicker;
  jug: JugKey | null;
}

export interface SetJugColorAction {
  type: typeof JugColorsActionTypes.SetJugColor;
  jug: JugKey;
  color: string;
}

export type JugColorsAction = SetActiveColorPickerAction | SetJugColorAction;

export const initialJugColorsState: JugColorsState = {
  jug1Color: '#3b82f6',
  jug2Color: '#22c55e',
  activePicker: null
};

export const jugColorsActionHandler: IActionHandler<JugColorsState> = (state, action) => {
  const typedAction = action as JugColorsAction;

  if (typedAction.type === JugColorsActionTypes.SetActiveColorPicker) {
    return {
      ...state,
      activePicker: typedAction.jug
    };
  }

  if (typedAction.type === JugColorsActionTypes.SetJugColor) {
    return {
      ...state,
      jug1Color: typedAction.jug === 'jug1' ? typedAction.color : state.jug1Color,
      jug2Color: typedAction.jug === 'jug2' ? typedAction.color : state.jug2Color,
      activePicker: null
    };
  }

  return state;
};
