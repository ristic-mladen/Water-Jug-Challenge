import { IActionHandler } from '@aurelia/state';

export type JugKey = 'jug1' | 'jug2';

export interface JugColorsState {
  jug1Color: string;
  jug2Color: string;
  activePicker: JugKey | null;
}

export interface SetActiveColorPickerAction {
  type: 'set-active-color-picker';
  jug: JugKey | null;
}

export interface SetJugColorAction {
  type: 'set-jug-color';
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

  if (typedAction.type === 'set-active-color-picker') {
    return {
      ...state,
      activePicker: typedAction.jug
    };
  }

  if (typedAction.type === 'set-jug-color') {
    return {
      ...state,
      jug1Color: typedAction.jug === 'jug1' ? typedAction.color : state.jug1Color,
      jug2Color: typedAction.jug === 'jug2' ? typedAction.color : state.jug2Color,
      activePicker: null
    };
  }

  return state;
};
