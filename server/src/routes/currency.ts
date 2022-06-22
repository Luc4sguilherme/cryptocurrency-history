import express from 'express';

import * as currencyController from '@src/controllers/currencyController';

const routerCurrency = express.Router();

routerCurrency.get('/', currencyController.listCurrencies);

export { routerCurrency };
