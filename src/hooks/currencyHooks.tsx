import useSWR from "swr";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";
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
 
  return {
    data: data as ConvertedCurrencyApiResponse,
    isLoading,
    error
  }
}

export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  const updater = useMemo(
    () =>
      debounce((val: T) => {
        setDebounced(val);
      }, delay),
    [delay]
  );

  useEffect(() => {
    updater(value);
    return () => updater.cancel();
  }, [value, updater]);

  return debounced;
}


export { useCurrencies, useCurrencyConversion };
