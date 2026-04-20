import { resolve, ISignaler } from 'aurelia';
import { HomePage } from './pages/home/home-page';
import { HistoryPage } from './pages/history/history-page';

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
        this.signaler.dispatchSignal('update-tick');
      }
    }, 1000);
  }
}
