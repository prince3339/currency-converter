import { useCallback, useEffect, useMemo, useState } from 'react';
// import { debounce } from 'lodash';
import InputWithDropdown from '../molecules/InputWithDropdown';
import { useCurrencies, useCurrencyConversion } from '../../hooks/currencyHooks';
import type { ConvertedCurrency, CurrencyType } from '../../types/types';

const CurrencyConverter = () => {
  const [fromAmount, setFromAmount] = useState<number | null>(null);
  const [toAmount, setToAmount] = useState<number | null>(null);
  const [fromCurrency, setFromCurrency] = useState<string | null>(null);
  const [toCurrency, setToCurrency] = useState<string | null>(null);
  const [lastChangedField, setLastChangedField] = useState<'from' | 'to' | null>(null);

  const { data: currencies, error, isLoading } = useCurrencies('FLAT' as CurrencyType);
  const { data: convertedCurrency, error: convertedApiError, isLoading: isConverting } = useCurrencyConversion({ 
    from: fromCurrency ?? undefined, 
    to: toCurrency ?? undefined, 
    amount: lastChangedField === 'from' ? fromAmount ?? undefined : toAmount ?? undefined
  })
  console.log(convertedCurrency, 'data', convertedApiError, isConverting)
  console.log({ currencies, error, isLoading });

  useEffect(() => {
  if (!convertedCurrency) return;
  const value = (convertedCurrency.response as ConvertedCurrency).value;
  if (lastChangedField === 'to') {
    setFromAmount(value);
  } else if (lastChangedField === 'from') {
    setToAmount(value);
  }
}, [convertedCurrency, lastChangedField]);


  const currencyList = useMemo(() => {
    if (isLoading || error || !currencies) return [];
    return currencies.response.map((currency) => ({
      name: `${currency.short_code} - ${currency.name}`,
      value: currency.short_code,
    })) || [];
  }, [currencies, isLoading, error]);

  const handleFromAmountChange = useCallback((value: string) => {
    setLastChangedField('from');
    setFromAmount(value ? parseFloat(value) : null);
    if (!value) {
      setToAmount(null);
    }
  }, []);

  const handleToAmountChange = useCallback((value: string) => {
    setLastChangedField('to');
    setToAmount(value ? parseFloat(value) : null);
    if (!value) {
      setFromAmount(null);
    }
  }, []);

  const handleFromCurrencyChange = useCallback((value: string | null) => {
    setFromCurrency(value);
  }, []);

  const handleToCurrencyChange = useCallback((value: string | null) => {
    setToCurrency(value);
  }, []);

  useEffect(() => {
  if (!currencies || currencyList.length === 0) return;

  if (!fromCurrency) setFromCurrency(currencyList[0].value);
  if (!toCurrency) setToCurrency(currencyList[currencyList.length - 1].value);
}, [currencyList, fromCurrency, toCurrency, currencies]);


  return (
    <div className="px-4 py-15">
      <h1 className="text-2xl font-bold mb-4 text-center">Currency Converter</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-15 max-w-[800px] mx-auto">
        <div>
          <label className="block text-sm font-medium mb-1 text-left" htmlFor="from-currency">
            From
          </label>
          <InputWithDropdown
            inputProps={{
              placeholder: 'Amount',
              type: 'number',
              onChange: handleFromAmountChange,
              value: fromAmount ? Number(fromAmount) : undefined
            }}
            selectProps={{
              options: currencyList,
              onChange: handleFromCurrencyChange,
              placeholder: 'Currency',
              value: fromCurrency,
              defaultValue: currencyList[0]?.value
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-left" htmlFor="to-currency">
            To
          </label>
          <InputWithDropdown
            inputProps={{
              placeholder: 'Amount',
              type: 'number',
              onChange: handleToAmountChange,
              value: toAmount ? Number(toAmount) : undefined
            }}
            selectProps={{
              options: currencyList,
              onChange: handleToCurrencyChange,
              placeholder: 'Currency',
              value: toCurrency,
              defaultValue: currencyList[currencyList.length - 1]?.value
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CurrencyConverter;
