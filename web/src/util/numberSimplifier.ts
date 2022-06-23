export default function numberSimplifier(number: number, precision: number) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: precision,
  }).format(number);
}
