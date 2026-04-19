import { JugAction } from './jug-action';

export interface ChallengeSolutionStep {
  jug1WaterLevel: number;
  jug2WaterLevel: number;
  jugAction: JugAction | number;
}
