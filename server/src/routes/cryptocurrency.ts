import express from 'express';

import * as cryptocurrencyController from '@src/controllers/cryptocurrencyController';

const routerCrytocurrency = express.Router();

routerCrytocurrency.get(
  '/prices/:currencyPair/historic',
  cryptocurrencyController.pricesHistory,
);
routerCrytocurrency.get(
  '/prices/:currencyPair/spot',
  cryptocurrencyController.spotPrices,
);
routerCrytocurrency.get('/', cryptocurrencyController.listCryptocurrencies);

export { routerCrytocurrency };
