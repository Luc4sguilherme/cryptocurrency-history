export default function intervalFormatter(
  dataSize: number,
  amountOfPoints: number,
) {
  return Math.trunc(dataSize / amountOfPoints);
}
