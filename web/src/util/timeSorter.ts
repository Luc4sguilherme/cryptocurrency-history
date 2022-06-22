import moment from 'moment';

export default function timeSorter(timeA: string, timeB: string) {
  if (moment(timeA).isBefore(timeB)) {
    return -1;
  }

  if (moment(timeA).isAfter(timeB)) {
    return 1;
  }

  return 0;
}
