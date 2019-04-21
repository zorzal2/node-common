import { AppError } from './error';
import { complete } from './code';

export default {
  error: { AppError },
  code: { complete },
  txid: { create: () => String(Math.random()).substr(2) }
};
