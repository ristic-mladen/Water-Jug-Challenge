import Aurelia from 'aurelia';
import { ValidationHtmlConfiguration } from '@aurelia/validation-html';
import { StateDefaultConfiguration } from '@aurelia/state';
import { RouterConfiguration } from '@aurelia/router';
import { I18nConfiguration } from '@aurelia/i18n';
import { Shell } from './shell';
import { AppConfigService } from './services/app-config-service';
import { ChallengeApiService } from './services/challenge-api-service';
import { ToastrService } from './services/toastr-service';
import { challengeHistoryActionHandler, initialChallengeHistoryState } from './state/challenge-history-state';
import { jugColorsActionHandler, initialJugColorsState } from './state/jug-colors-state';
import './app.css';
import * as en from './locale/en/translation.json';
import { JugActionValueConverter } from './value-converters/jug-action-value-converter';
import { NumberValueConverter } from './value-converters/number-value-converter';
import { DateFormatValueConverter } from './value-converters/date-format-value-converter';

Aurelia
  .register(
    RouterConfiguration,
    ValidationHtmlConfiguration,
    StateDefaultConfiguration
      .init(initialChallengeHistoryState, challengeHistoryActionHandler)
      .withStore('jug-colors', initialJugColorsState, jugColorsActionHandler),
    I18nConfiguration.customize((options) => {
      options.initOptions = {
        resources: {
          en: { translation: en },
        },
        lng: 'en',
        fallbackLng: 'en'
      };
    }),
    ToastrService,
    AppConfigService,
    ChallengeApiService
  )
  .register(JugActionValueConverter, NumberValueConverter, DateFormatValueConverter)
  .app(Shell)
  .start();
