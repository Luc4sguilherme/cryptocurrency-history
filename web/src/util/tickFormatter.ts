import moment from 'moment';

import { Period } from '../services/api';

export default function tickFormatter(time: string, period: Period) {
  const localTime = moment(time).utc().local();

  switch (period) {
    case 'hour':
      return localTime.format('HH:mm').toString();
    case 'day':
      return localTime.format('HH:mm').toString();
    case 'week':
      return localTime.format('dddd').toString();
    case 'month':
      return localTime.format('MM/DD').toString();
    case 'year':
      return localTime.format('YYYY/MM').toString();
    case 'all':
      return localTime.format('YYYY/MM').toString();
    default:
      return localTime.toString();
  }
}
