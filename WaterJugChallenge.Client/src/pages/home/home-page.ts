import { IValidationRules } from '@aurelia/validation';
import { IValidationController } from '@aurelia/validation-html';
import { IStore, IStoreRegistry, type IStoreSubscriber } from '@aurelia/state';
import { newInstanceForScope, resolve } from 'aurelia';
import { ChallengeSolutionStep } from '../../models/challenge-solution-step';
import { FindChallengeSolutionRequest } from '../../models/dtos/find-challenge-solution-request';
import { ChallengeApiService } from '../../services/challenge-api-service';
import { ToastrService } from '../../services/toastr-service';
import { UserNotifiedError } from '../../errors/user-notified-error';
import { AddHistoryEntryAction, ChallengeHistoryState } from '../../state/challenge-history-state';
import { BucketColorsState, SetActiveColorPickerAction, SetBucketColorAction } from '../../state/bucket-colors-state';

type BucketColorsStore = IStore<BucketColorsState, SetActiveColorPickerAction | SetBucketColorAction>;
type HistoryStore = IStore<ChallengeHistoryState, AddHistoryEntryAction>;

export class HomePage implements IStoreSubscriber<BucketColorsState> {
  public readonly form: FindChallengeSolutionRequest = {
    jug1Capacity: 3,
    jug2Capacity: 5,
    targetAmount: 4
  };

  public isLoading = false;
  public currentSteps: ChallengeSolutionStep[] = [];
  public jug1Color = '#3b82f6';
  public jug2Color = '#22c55e';
  public activePicker: 'jug1' | 'jug2' | null = null;

  private readonly challengeApiService = resolve(ChallengeApiService);
  private readonly toastr = resolve(ToastrService);
  private readonly validationRules = resolve(IValidationRules);
  private readonly validationController = resolve(newInstanceForScope(IValidationController));
  private readonly historyStore = resolve(IStore) as HistoryStore;
  private readonly bucketColorsStore = resolve(IStoreRegistry).getStore<BucketColorsState>('bucket-colors') as BucketColorsStore;

  public binding(): void {
    this.validationRules
      .on(this.form)
      .ensure((x) => x.jug1Capacity)
      .required()
      .min(1)
      .satisfies((value) => Number.isInteger(value))
      .withMessage('Jug 1 capacity must be an integer.')
      .ensure((x) => x.jug2Capacity)
      .required()
      .min(1)
      .satisfies((value) => Number.isInteger(value))
      .withMessage('Jug 2 capacity must be an integer.')
      .ensure((x) => x.targetAmount)
      .required()
      .min(1)
      .satisfies((value) => Number.isInteger(value))
      .withMessage('Target amount must be an integer.')
      .satisfies((value, model) => value <= Math.max(model.jug1Capacity, model.jug2Capacity))
      .withMessage('Target amount must be less than or equal to the largest jug capacity.');

    this.validationController.addObject(this.form);
    this.bucketColorsStore.subscribe(this);
    this.syncColors(this.bucketColorsStore.getState());
  }

  public unbinding(): void {
    this.validationController.removeObject(this.form);
    this.bucketColorsStore.unsubscribe(this);
  }

  public async solve(): Promise<void> {
    const validationResult = await this.validationController.validate();
    if (!validationResult.valid) {
      const messages = validationResult.results
        .filter((r) => !r.valid && r.message)
        .map((r) => r.message);
      const summary = messages.length > 0 ? messages.join(' ') : 'Please fix validation errors.';
      this.toastr.warning(summary);
      return;
    }

    this.isLoading = true;
    try {
      const response = await this.challengeApiService.findSolution(this.form);
      this.currentSteps = response.challengeSolutionSteps ?? [];
      await this.historyStore.dispatch({
        type: 'add-history-entry',
        entry: {
          id: crypto.randomUUID(),
          requestedAt: new Date().toISOString(),
          jug1Capacity: this.form.jug1Capacity,
          jug2Capacity: this.form.jug2Capacity,
          targetAmount: this.form.targetAmount,
          jug1Color: this.jug1Color,
          jug2Color: this.jug2Color,
          steps: this.currentSteps
        }
      });
    } catch (error) {
      this.currentSteps = [];
      if (!(error instanceof UserNotifiedError)) {
        const message = error instanceof Error ? error.message : 'Unable to fetch challenge solution.';
        this.toastr.error(message);
      }
    } finally {
      this.isLoading = false;
    }
  }

  public toggleBucketColorPicker(bucket: 'jug1' | 'jug2'): void {
    const nextBucket = this.activePicker === bucket ? null : bucket;
    void this.bucketColorsStore.dispatch({ type: 'set-active-color-picker', bucket: nextBucket });
  }

  public updateJug1Color = (color: string): void => {
    void this.bucketColorsStore.dispatch({ type: 'set-bucket-color', bucket: 'jug1', color });
  };

  public updateJug2Color = (color: string): void => {
    void this.bucketColorsStore.dispatch({ type: 'set-bucket-color', bucket: 'jug2', color });
  };

  public handleStateChange(state: BucketColorsState): void {
    this.syncColors(state);
  }

  private syncColors(state: BucketColorsState): void {
    this.jug1Color = state.jug1Color;
    this.jug2Color = state.jug2Color;
    this.activePicker = state.activePicker;
  }
}
