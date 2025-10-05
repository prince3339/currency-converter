export type BaseOption = {
  name: string;
  value: string;
}

export type CurrencyType = 'FLAT' | 'CRYPTO'

export type Currency = {
  id: number;
  code: string;
  name: string;
  short_code: string;
  symbol: string;
  symbol_first: boolean;
  subunit: number;
  precision: number;
  decimal_mark: string;
  thousands_separator: string;
};

export type CurrencyMetaData = {
  code: number;
  disclaimer: string;
}

export interface CurrencyApiResponse {
  [key: string]: Currency | CurrencyMetaData | Currency[];
  meta: CurrencyMetaData;
  response: Currency[];
}
