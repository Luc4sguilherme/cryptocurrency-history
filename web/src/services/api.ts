import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';

const api = axios.create({
  baseURL: API_URL,
});

export type Price = {
  price: string;
  time: string;
};

export type PriceHistory = {
  base: string;
  currency: string;
  prices: Price[];
};

export type SpotPrice = {
  base: string;
  currency: string;
  amount: string;
};

export type Currency = {
  id: string;
  name: string;
  min_size: string;
};

export type Period = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';

export const getPricesHistory = async (
  currencyPair: string,
  period: Period,
): Promise<PriceHistory> => {
  const { data } = await api.get(
    `/cryptocurrencies/prices/${currencyPair}/historic?period=${period}`,
  );

  return data;
};

export const getSpotPrices = async (
  currencyPair: string,
): Promise<SpotPrice> => {
  const { data } = await api.get(
    `/cryptocurrencies/prices/${currencyPair}/spot`,
  );

  return data;
};

export const getCryptocurrency = async (): Promise<string[]> => {
  const { data } = await api.get(`/cryptocurrencies`);

  return data;
};

export const getCurrency = async (): Promise<Currency[]> => {
  const { data } = await api.get(`/currencies`);

  return data;
};
