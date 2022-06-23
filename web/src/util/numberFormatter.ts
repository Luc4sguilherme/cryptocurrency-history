import numberSimplifier from './numberSimplifier';

export default function numberFormatter(
  number: number | string,
  precision: number,
  simplify = false,
) {
  const valueFormated = Number(number).toLocaleString('en-US', {
    useGrouping: false,
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });

  const value = Number(valueFormated);

  if (simplify) {
    return numberSimplifier(value, 2);
  }

  return value;
}
