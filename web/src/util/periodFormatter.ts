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
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
  month: {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
  year: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
  all: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
};

export default function periodFormatter(time: string, period: Period) {
  const locale = window.navigator.language;
  const formatOptions = OPTIONS[period] as Intl.DateTimeFormatOptions;

  return timeFormatter(time, locale, formatOptions);
}
