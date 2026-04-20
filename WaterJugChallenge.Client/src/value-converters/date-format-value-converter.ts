import { I18N } from '@aurelia/i18n';
import { resolve } from 'aurelia';

export class DateFormatValueConverter {
  private i18n = resolve(I18N);
  
  toView(value: string, type: 'full' | 'relative' = 'full') {
    if (!value) return '';

    const date = new Date(value);
    
    if (isNaN(date.getTime())) return value;

    if (type === 'relative') {
      return this.getRelativeTime(date);
    }

    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit' 
    };

    return this.i18n.df(date, options);
  }

  private getRelativeTime(date: Date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 5) return 'Just now'; 
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    
    return this.i18n.df(date, { month: 'short', day: 'numeric', year: 'numeric' });
  }
}