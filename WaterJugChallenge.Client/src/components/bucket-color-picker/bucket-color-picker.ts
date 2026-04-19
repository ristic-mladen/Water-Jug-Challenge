import { bindable } from 'aurelia';

export class BucketColorPicker {
  @bindable public color = '#000000';
  @bindable public onColorSelected?: (color: string) => void;

  public selectColor(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (this.onColorSelected != null) {
      this.onColorSelected(target.value);
    }
  }
}
