export default function numberSimplifier(number: number, precision: number) {
  return new Intl.NumberFormat(window.navigator.language, {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: precision,
  }).format(number);
}
