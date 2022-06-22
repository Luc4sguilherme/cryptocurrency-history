import * as dotenv from 'dotenv';

dotenv.config();

export default {
  App: {
    port: Number(process.env.APP_PORT) || 3333,
    logger: {
      enabled: Boolean(process.env.APP_LOGGER_ENABLED),
      level: String(process.env.APP_LOGGER_LEVEL),
    },
    coinbase: {
      apiKey: String(process.env.COINBASE_API_KEY),
      apiSecret: String(process.env.COINBASE_API_SECRET),
    },
  },
};
