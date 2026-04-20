import { resolve, valueConverter } from 'aurelia';
import { JugAction } from '../models/jug-action';
import { I18nService } from '@aurelia/i18n';

@valueConverter('jugAction')
export class JugActionValueConverter {
  private readonly i18n = resolve(I18nService);
  
  public toView(action: JugAction): string {
    return this.i18n.tr(`jugActionType.${action}`);  
  }
}
