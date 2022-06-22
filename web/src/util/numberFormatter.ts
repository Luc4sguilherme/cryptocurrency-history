export default function numberFormatter(
  number: number | string,
  precision: number,
) {
  const valueFormated = Number(number).toLocaleString('en-US', {
    useGrouping: false,
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });

  return Number(valueFormated);
}
