import useSWR from "swr";
import { fetcher } from "../services/api";
import type { CurrencyType, CurrencyApiResponse, Conversion, ConvertedCurrencyApiResponse } from '../types/types';

const useCurrencies = (type: CurrencyType) => {
  const { data, error, isLoading } = useSWR(`/currencies?type=${type.toLocaleLowerCase()}`, fetcher)
 
  return {
    data: data as CurrencyApiResponse,
    isLoading,
    error
  }
}

const useCurrencyConversion = ({ from, to, amount } : Conversion) => {
  const shouldFetch = from && to && amount != null;
  const { data, error, isLoading } = useSWR<ConvertedCurrencyApiResponse>(
    shouldFetch ? `/convert?from=${from}&to=${to}&amount=${amount}` : null,
    fetcher
  );
 
  console.log({ data, error, isLoading });

  return {
    data: data as ConvertedCurrencyApiResponse,
    isLoading,
    error
  }
}

export { useCurrencies, useCurrencyConversion };
