import { valueConverter } from 'aurelia';
import { JugAction } from '../models/jug-action';

@valueConverter('jugAction')
export class JugActionValueConverter {
  public toView(action: JugAction | number): string {
    const rawAction = this.resolveActionName(action);
    return this.formatActionName(rawAction);
  }

  private resolveActionName(action: JugAction | number): string {
    if (typeof action === 'string') {
      return action;
    }

    const actionMap: Record<number, JugAction> = {
      0: JugAction.FillJug1,
      1: JugAction.FillJug2,
      2: JugAction.EmptyJug1,
      3: JugAction.EmptyJug2,
      4: JugAction.PourJug1IntoJug2,
      5: JugAction.PourJug2IntoJug1
    };

    return actionMap[action] ?? String(action);
  }

  private formatActionName(actionName: string): string {
    return actionName
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/([A-Za-z])([0-9])/g, '$1 $2')
      .replace(/([0-9])([A-Za-z])/g, '$1 $2')
      .trim();
  }
}
