import { Client } from 'coinbase';
import fs from 'fs';

import config from '~/config';

Client.prototype.getPricesHistory = function (params, callback) {
  let opts, currencyPair;

  if (params.currencyPair) {
    currencyPair = params.currencyPair;
    delete params.currencyPair;
  } else if (params.currency) {
    currencyPair = 'BTC-' + params.currency;
    delete params.currency;
  } else {
    currencyPair = 'BTC-USD';
  }

  opts = { path: 'prices/' + currencyPair + '/historic', params: params };

  this._getOneHttp(opts, callback);
};

const client = new Client({
  apiKey: config.App.coinbase.apiKey,
  apiSecret: config.App.coinbase.apiSecret,
  strictSSL: true,
  caFile: fs.readFileSync('./.cert/ca-coinbase.crt'),
});

export const getSpotPrice = currencyPair =>
  new Promise((resolve, reject) => {
    client.getSpotPrice({ currencyPair }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.data);
      }
    });
  });

const getAccountsAsync = (paginationParams = {}) =>
  new Promise((resolve, reject) => {
    client.getAccounts(
      { limit: 100, ...paginationParams },
      (error, accounts, pagination) => {
        if (error) {
          reject(error);
        } else {
          resolve({ accounts, pagination });
        }
      },
    );
  });

const getAccounts = async () => {
  const accounts = [];

  let response = await getAccountsAsync();

  while (true) {
    accounts.push(...response.accounts);

    if (!response.pagination.next_uri) {
      break;
    }

    response = await getAccountsAsync(response.pagination);
  }

  if (!accounts.length) {
    throw new Error('Accounts not found');
  }

  return accounts;
};

export const getCurrencies = () =>
  new Promise((resolve, reject) => {
    client.getCurrencies((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.data);
      }
    });
  });

export const getCryptocurrencies = async () => {
  const accounts = await getAccounts();

  return accounts.map(account => account.currency);
};

export const getPricesHistory = (currencyPair, period = 'hour') =>
  new Promise((resolve, reject) => {
    client.getPricesHistory({ currencyPair, period }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.data);
      }
    });
  });
