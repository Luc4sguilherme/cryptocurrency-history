export default function timeFormatter(
  time: Date | number | string,
  locales?: string | string[],
  formatOptions?: Intl.DateTimeFormatOptions,
) {
  return new Intl.DateTimeFormat(locales, formatOptions).format(new Date(time));
}
