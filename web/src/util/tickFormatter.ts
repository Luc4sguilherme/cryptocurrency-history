import { Period } from '../services/api';
import timeFormatter from './timeFormatter';

const OPTIONS = {
  hour: {
    hour: 'numeric',
    minute: 'numeric',
  },
  day: {
    hour: 'numeric',
    minute: 'numeric',
  },
  week: {
    weekday: 'short',
  },
  month: {
    month: '2-digit',
    day: '2-digit',
  },
  year: {
    year: 'numeric',
    month: '2-digit',
  },
  all: {
    year: 'numeric',
    month: '2-digit',
  },
};

export default function tickFormatter(time: string, period: Period) {
  const locale = window.navigator.language;
  const formatOptions = OPTIONS[period] as Intl.DateTimeFormatOptions;

  return timeFormatter(time, locale, formatOptions);
}
