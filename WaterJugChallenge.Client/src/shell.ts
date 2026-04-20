import { resolve, ISignaler } from 'aurelia';
import { HomePage } from './pages/home/home-page';
import { HistoryPage } from './pages/history/history-page';
import { TICK_SIGNAL } from './common/constants';

export class Shell {
  private signaler = resolve(ISignaler);

  public static routes = [
    {
      path: '',
      component: HomePage,
      title: 'Home'
    },
    {
      path: 'history',
      component: HistoryPage,
      title: 'History'
    }
  ];

  attached() {
    setInterval(() => {
      if (document.visibilityState === 'visible') {
        this.signaler.dispatchSignal(TICK_SIGNAL);
      }
    }, 1000);
  }
}
