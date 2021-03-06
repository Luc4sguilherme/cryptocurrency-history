import './styles.css';
import { useEffect, useMemo, useState } from 'react';

import { History } from '../../App';
import numberFormatter from '../../util/numberFormatter';
import timeFormatter from '../../util/timeFormatter';

type InfosProps = {
  currency: string;
  currencyPrice: number;
  historic: History[];
};

function Infos({ currency, currencyPrice, historic }: InfosProps) {
  const [status, setStatus] = useState<string | undefined>(undefined);
  const dateNow = useMemo(
    () =>
      timeFormatter(new Date(), window.navigator.language, {
        hour: 'numeric',
        minute: 'numeric',
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZoneName: 'shortOffset',
      }),
    [historic],
  );

  useEffect(() => {
    if (historic.length > 0) {
      const initialValue = historic.filter(value => value.price > 0)[0].price;
      const finalValue = currencyPrice;
      const diff = finalValue - initialValue;
      const value = numberFormatter(Math.abs(diff), 2, true);
      const percentage = numberFormatter(
        Math.abs(diff / initialValue) * 100,
        2,
      );

      if (diff > 0) {
        setStatus(`+${value} (${percentage}%)`);
        return;
      }

      if (diff < 0) {
        setStatus(`-${value} (${percentage}%)`);
        return;
      }

      setStatus(undefined);
    }
  }, [historic, currencyPrice]);

  return (
    <div className="infos-wrapper">
      <div className="currency-value">
        <span className="value">{numberFormatter(currencyPrice, 2, true)}</span>
        <span className="currency">{currency}</span>
      </div>
      {status && (
        <div
          className="status"
          style={{
            color: status.startsWith('+')
              ? 'var(--primaryGraph)'
              : 'var(--secondaryGraph)',
          }}
        >
          {status}
        </div>
      )}
      <div className="infos-source">
        <div className="infos-date">{dateNow}</div>
        <span className="separator"> - </span>
        <div className="source">
          <a href="https://www.coinbase.com/price/" className="source-link">
            Source
          </a>
        </div>
      </div>
    </div>
  );
}

export default Infos;
