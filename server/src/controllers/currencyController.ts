import { Request, Response } from 'express';
import moment from 'moment';

import logger from '@src/logger';
import * as coinbase from '@src/services/coinbase';
import * as cache from '@src/util/cache';

export async function listCurrencies(req: Request, res: Response) {
  try {
    const cacheKey = 'currencies';
    const currenciesCached = cache.get(cacheKey);

    if (currenciesCached) {
      res.send(JSON.stringify(currenciesCached));
      return;
    }

    const currencies = await coinbase.getCurrencies();
    const cacheDuration = moment.duration(24, 'hours').asSeconds();

    cache.set(cacheKey, currencies, cacheDuration);

    res.send(JSON.stringify(currencies));
  } catch (error) {
    logger.error(error);
    res
      .status(500)
      .send({ error: 'An error occurred while getting the currencies' });
  }
}
