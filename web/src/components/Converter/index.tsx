import './styles.css';

import { useEffect, useState } from 'react';

import { getCryptocurrency, getCurrency } from '../../services/api';
import currencySorter from '../../util/currencySorter';
import numberFormatter from '../../util/numberFormatter';
import Control from '../Control';

type ConverterProps = {
  cryptocurrency: string;
  currency: string;
  setCryptocurrency: React.Dispatch<React.SetStateAction<string>>;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  currencyPrice: number;
};

function Converter({
  cryptocurrency,
  setCryptocurrency,
  currency,
  currencyPrice,
  setCurrency,
}: ConverterProps) {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [cryptocurrencies, setCryptocurrencies] = useState<string[]>([]);
  const [valueOfCurrency, setValueOfCurrency] = useState(0);
  const [valueOfcryptocurrency, setValueOfCryptocurrency] = useState(1);

  useEffect(() => {
    getCryptocurrency()
      .then(data => {
        setCryptocurrencies(data.sort(currencySorter));
      })
      .catch(error => console.error(error.message));
  }, []);

  useEffect(() => {
    getCurrency()
      .then(data => {
        setCurrencies(data.map(item => item.id));
      })
      .catch(error => console.error(error.message));
  }, []);

  useEffect(() => {
    setValueOfCurrency(currencyPrice);
  }, [currencyPrice]);

  useEffect(() => {
    setValueOfCurrency(
      numberFormatter(currencyPrice * valueOfcryptocurrency, 2),
    );
  }, [valueOfcryptocurrency, currencyPrice]);

  return (
    <div className="converter-wrapper">
      <Control
        currency={cryptocurrency}
        contents={cryptocurrencies}
        value={valueOfcryptocurrency}
        setCurrency={setCryptocurrency}
        setValue={setValueOfCryptocurrency}
        type="cryptocurrency"
      />
      <Control
        currency={currency}
        contents={currencies}
        value={valueOfCurrency}
        setCurrency={setCurrency}
        setValue={setValueOfCurrency}
        type="currency"
      />
    </div>
  );
}

export default Converter;
