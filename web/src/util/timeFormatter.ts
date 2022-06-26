import moment from 'moment';

import { Period } from '../services/api';

export default function timeFormatter(time: string, period: Period) {
  const localTime = moment(time).utc().local();

  switch (period) {
    case 'hour':
      return localTime.format('HH:mm');
    case 'day':
      return localTime.format('MM/DD - HH:mm');
    case 'week':
      return localTime.format('llll');
    case 'month':
      return localTime.format('lll');
    case 'year':
      return localTime.format('ll');
    case 'all':
      return localTime.format('ll');
    default:
      return localTime;
  }
}
