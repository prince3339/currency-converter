import { useCallback, useEffect, useMemo, useState } from 'react';
import InputWithDropdown from '../molecules/InputWithDropdown';
import { useCurrencies, useCurrencyConversion, useDebouncedValue } from '../../hooks/currencyHooks';
import type { ConvertedCurrency, CurrencyType, ConversionStorageDataType, conversionParamType } from '../../types/types';

const CurrencyConverter = () => {
  const [fromAmount, setFromAmount] = useState<number | null>(null);
  const [toAmount, setToAmount] = useState<number | null>(null);
  const [fromCurrency, setFromCurrency] = useState<string | null>(null);
  const [toCurrency, setToCurrency] = useState<string | null>(null);
  const [lastChangedField, setLastChangedField] = useState<'from' | 'to' | null>(null);
  const debouncedFromAmount = useDebouncedValue(fromAmount, 300);
  const debouncedToAmount = useDebouncedValue(toAmount, 300);
  const [conversionList, setConversionList] = useState<ConversionStorageDataType[]>([])
  const { data: currencies, error, isLoading } = useCurrencies('FLAT' as CurrencyType);
  const isFromChanged = lastChangedField === 'from';

  const displayedConversions = conversionList?.slice(0, 5)

  const handleStoreConversion = ({
    fromAmount: updatedFromAmount,
    toAmount: updatedToAmount
  }: conversionParamType) => {
    const data: ConversionStorageDataType = {
      fromCurrency,
      toCurrency,
      fromAmount: updatedFromAmount || fromAmount,
      toAmount: updatedToAmount || toAmount
    } as ConversionStorageDataType
  
    const updatedConversions = [data, ...conversionList]
    console.log(toAmount, 'conversionStorage')

    setConversionList(updatedConversions)
  }

  const apiPayload = useMemo(() => {
    if (!fromCurrency || !toCurrency) return null;

    if (lastChangedField === 'from') {
      return {
        from: fromCurrency,
        to: toCurrency,
        amount: debouncedFromAmount ?? undefined,
      };
    } else if (lastChangedField === 'to') {
      return {
        from: toCurrency,
        to: fromCurrency,
        amount: debouncedToAmount ?? undefined,
      };
    }
    return null;
}, [fromCurrency, toCurrency, debouncedFromAmount, debouncedToAmount, lastChangedField]);


  const { data: convertedCurrency } = useCurrencyConversion(apiPayload ?? {});

  useEffect(() => {
    if (!convertedCurrency) return;

    const value = (convertedCurrency.response as ConvertedCurrency).value;
    const payload: conversionParamType = {};

    if (isFromChanged) {
      setToAmount(value);
      payload.toAmount = value
    }
    else {
      setFromAmount(value);
      payload.fromAmount = value
    }
    
    handleStoreConversion(payload)
  }, [convertedCurrency, isFromChanged]);

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
            }}
          />
        </div>
      </div>

      <ul className='mt-8'>
        {displayedConversions?.map(conversion => {
          return (
            <li className='flex gap-8 p-2'>
              <div>
                From
                <span className='block'>
                  {conversion.fromCurrency}
                </span>
                <span>
                  {conversion.fromAmount}
                </span>
              </div>

              <div>
                To
                <span className='block'>
                  {conversion.toCurrency}
                </span>
                <span>
                  {conversion.toAmount}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default CurrencyConverter;
