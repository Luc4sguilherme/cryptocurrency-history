import moment from 'moment';

import { Period } from '../services/api';

export default function timeFormatter(time: string, period: Period) {
  switch (period) {
    case 'hour':
      return moment(time).utc().format('HH:mm');
    case 'day':
      return moment(time).utc().format('MM/DD - HH:mm');
    case 'week':
      return moment(time).utc().format('llll');
    case 'month':
      return moment(time).utc().format('lll');
    case 'year':
      return moment(time).utc().format('ll');
    case 'all':
      return moment(time).utc().format('ll');
    default:
      return moment(time).utc();
  }
}
