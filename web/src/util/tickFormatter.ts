import moment from 'moment';

import { Period } from '../services/api';

export default function tickFormatter(time: string, period: Period) {
  switch (period) {
    case 'hour':
      return moment(time).utc().format('HH:mm').toString();
    case 'day':
      return moment(time).utc().format('HH:mm').toString();
    case 'week':
      return moment(time).utc().format('dddd').toString();
    case 'month':
      return moment(time).utc().format('MM/DD').toString();
    case 'year':
      return moment(time).utc().format('YYYY/MM').toString();
    case 'all':
      return moment(time).utc().format('YYYY/MM').toString();
    default:
      return moment(time).utc().toString();
  }
}
