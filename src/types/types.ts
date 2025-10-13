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

export type ConvertedCurrency = {
  amount: number;
  date: string;
  from: string;
  timestamp: string;
  to: string;
  value: number;
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

export interface ConvertedCurrencyApiResponse {
  [key: string]: ConvertedCurrency | CurrencyMetaData | Currency[];
  meta: CurrencyMetaData;
  response: ConvertedCurrency;
}

export type Conversion = {
  from?: string;
  to?: string;
  amount?: number;
}

export type ConversionStorageDataType = {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
}

export type conversionParamType = {
  fromAmount?: number, toAmount?: number
}
