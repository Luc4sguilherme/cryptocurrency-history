import { Period } from '../services/api';

export default function intervalFormatter(
  period: Period,
  dataSize: number,
  amountOfPoints: number,
) {
  return Math.trunc(dataSize / amountOfPoints);
}
