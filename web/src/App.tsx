import './App.css';

import moment from 'moment';
import { useEffect, useState } from 'react';

import Converter from './components/Converter';
import Graph from './components/Graph';
import Infos from './components/Infos';
import Loading from './components/Loading';
import PeriodControl from './components/PeriodControl';
import ScreenshotButton from './components/ScreenshotButton';
import { getPricesHistory, getSpotPrices, Period } from './services/api';
import numberFormatter from './util/numberFormatter';
import timeSorter from './util/timeSorter';

export type History = {
  name: number;
  time: string;
  price: number;
};

function App() {
  const [historic, setHistory] = useState<History[]>([]);
  const [period, setPeriod] = useState<Period>('day');
  const [currency, setCurrency] = useState('USD');
  const [cryptocurrency, setCryptocurrency] = useState('BTC');
  const [currencyPrice, setCurrencyPrice] = useState(0);

  useEffect(() => {
    getPricesHistory(`${cryptocurrency}-${currency}`, period)
      .then(data => {
        const prices = data.prices
          .map(({ time, price }) => {
            return {
              name: moment(time).valueOf(),
              price: numberFormatter(price, 2),
              time,
            };
          })
          .sort((a, b) => timeSorter(a.time, b.time));

        setHistory(prices);
      })
      .catch(console.error);
  }, [currency, cryptocurrency, period]);

  useEffect(() => {
    getSpotPrices(`${cryptocurrency}-${currency}`)
      .then(data => {
        setCurrencyPrice(numberFormatter(data.amount, 2));
      })
      .catch(error => console.error(error.message));
  }, [currency, cryptocurrency]);

  if (historic.length === 0) {
    return <Loading />;
  }

  return (
    <div className="App">
      <ScreenshotButton />
      <main className="contents-wrapper">
        <Infos
          currency={currency}
          currencyPrice={currencyPrice}
          historic={historic}
        />
        <PeriodControl setPeriod={setPeriod} />
        <Graph data={historic} period={period} />
        <Converter
          currency={currency}
          cryptocurrency={cryptocurrency}
          currencyPrice={currencyPrice}
          setCurrency={setCurrency}
          setCryptocurrency={setCryptocurrency}
        />
      </main>
    </div>
  );
}

export default App;
