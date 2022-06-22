export default function currencySorter(currencyA: string, currencyB: string) {
  if (currencyA < currencyB) {
    return -1;
  }

  if (currencyA > currencyB) {
    return 1;
  }

  return 0;
}
