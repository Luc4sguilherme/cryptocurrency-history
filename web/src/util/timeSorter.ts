export default function timeSorter(timeA: string, timeB: string) {
  if (new Date(timeA).getTime() < new Date(timeB).getTime()) {
    return -1;
  }

  if (new Date(timeA).getTime() > new Date(timeB).getTime()) {
    return 1;
  }

  return 0;
}
