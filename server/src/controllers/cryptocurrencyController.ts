import { Request, Response } from 'express';
import moment from 'moment';

import logger from '@src/logger';
import * as coinbase from '@src/services/coinbase';
import * as cache from '@src/util/cache';

export async function pricesHistory(req: Request, res: Response) {
  try {
    if (!req.params) {
      res.status(400).send({ error: 'No currency pair parameter' });
      return;
    }

    const { currencyPair } = req.params;
    const { period } = req.query;

    const cacheKey = `price-historic-${currencyPair}-${period}`;
    const cachedPricesHistory = cache.get(cacheKey);

    if (cachedPricesHistory) {
      res.send(JSON.stringify(cachedPricesHistory));
      return;
    }

    const pricesHistory = await coinbase.getPricesHistory(
      currencyPair,
      period as string,
    );
    const cacheDuration = moment.duration(1, 'minutes').asSeconds();

    cache.set(cacheKey, pricesHistory, cacheDuration);

    res.send(JSON.stringify(pricesHistory));
  } catch (error) {
    logger.error(error);
    res
      .status(500)
      .send({ error: 'An error occurred while getting the prices historic' });
  }
}

export async function spotPrices(req: Request, res: Response) {
  try {
    if (!req.params) {
      res.status(400).send({ error: 'No currency pair parameter' });
      return;
    }

    const { currencyPair } = req.params;

    const cacheKey = `spot-price-${currencyPair}`;
    const spotPriceCached = cache.get(cacheKey);

    if (spotPriceCached) {
      res.send(JSON.stringify(spotPriceCached));
      return;
    }

    const spotPrices = await coinbase.getSpotPrice(currencyPair);
    const cacheDuration = moment.duration(1, 'minutes').asSeconds();

    cache.set(cacheKey, spotPrices, cacheDuration);

    res.send(JSON.stringify(spotPrices));
  } catch (error) {
    logger.error(error);
    res
      .status(500)
      .send({ error: 'An error occurred while getting the spot prices' });
  }
}

export async function listCryptocurrencies(req: Request, res: Response) {
  try {
    const cacheKey = 'cryptocurrencies';
    const cryptocurrenciesCached = cache.get(cacheKey);

    if (cryptocurrenciesCached) {
      res.send(JSON.stringify(cryptocurrenciesCached));
      return;
    }

    const cryptocurrencies = await coinbase.getCryptocurrencies();
    const cacheDuration = moment.duration(24, 'hours').asSeconds();

    cache.set(cacheKey, cryptocurrencies, cacheDuration);

    res.send(JSON.stringify(cryptocurrencies));
  } catch (error) {
    logger.error(error);
    res
      .status(500)
      .send({ error: 'An error occurred while getting the cryptocurrencies' });
  }
}
