import useSWR from "swr";
import { fetcher } from "../services/api";
import type { CurrencyType, CurrencyApiResponse } from '../types/types';

const useCurrencies = (type: CurrencyType) => {
  const { data, error, isLoading } = useSWR(`/currencies?type=${type.toLocaleLowerCase()}`, fetcher)
 
  return {
    currencies: data as CurrencyApiResponse,
    isLoading,
    error
  }
}

export { useCurrencies };
