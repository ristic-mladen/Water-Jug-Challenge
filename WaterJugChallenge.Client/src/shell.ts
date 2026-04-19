import { HomePage } from './pages/home/home-page';
import { HistoryPage } from './pages/history/history-page';

export class Shell {
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
}
