import './App.css';

import { useEffect, useState } from 'react';

import Converter from './components/Converter';
import Graph from './components/Graph';
import Infos from './components/Infos';
import Loading from './components/Loading';
import PeriodControl from './components/PeriodControl';
import ThemeSwitcher from './components/ThemeSwitcher';
import { ThemeProvider } from './contexts/themeContext';
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
              name: new Date(time).getTime(),
              price: numberFormatter(price, 2) as number,
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
        setCurrencyPrice(numberFormatter(data.amount, 2) as number);
      })
      .catch(error => console.error(error.message));
  }, [currency, cryptocurrency]);

  if (historic.length === 0) {
    return <Loading />;
  }

  return (
    <ThemeProvider>
      <div className="App">
        <header className="header-wrapper">
          <ThemeSwitcher />
          <h1 className="title">{cryptocurrency}</h1>
        </header>

        <main className="contents-wrapper">
          <Infos
            currency={currency}
            currencyPrice={currencyPrice}
            historic={historic}
          />
          <PeriodControl setPeriod={setPeriod} />
          <Graph data={historic} period={period} />
        </main>

        <footer className="footer-wrapper">
          <Converter
            currency={currency}
            cryptocurrency={cryptocurrency}
            currencyPrice={currencyPrice}
            setCurrency={setCurrency}
            setCryptocurrency={setCryptocurrency}
          />
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
