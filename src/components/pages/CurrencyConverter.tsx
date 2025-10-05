import { useMemo } from 'react';
import InputWithDropdown from '../molecules/InputWithDropdown';
import { useCurrencies } from '../../hooks/currencyHooks';
import type { CurrencyType } from '../../types/types';

const CurrencyConverter = () => {
  const { currencies, error, isLoading } = useCurrencies('FLAT' as CurrencyType);
  console.log({ currencies, error, isLoading });

  const currencyList = useMemo(() => {
    if (isLoading || error || !currencies) return [];
    return currencies.response.map((currency) => ({
      name: `${currency.short_code} - ${currency.name}`,
      value: currency.short_code,
    }));
  }, [currencies, isLoading, error]);

  return (
    <div className="px-4 py-15">
      <h1 className="text-2xl font-bold mb-4 text-center">Currency Converter</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-15 max-w-[800px] mx-auto">
        <div>
          <label className="block text-sm font-medium mb-1 text-left" htmlFor="from-currency">
            From
          </label>
          <InputWithDropdown
            inputProps={{ placeholder: 'Amount', type: 'number', isRequired: true }}
            selectProps={{
              options: currencyList,
              onChange: (value) => console.log('To currency changed to:', value),
              placeholder: 'Currency',
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-left" htmlFor="to-currency">
            To
          </label>
          <InputWithDropdown
            inputProps={{ placeholder: 'Amount', type: 'number', isRequired: true }}
            selectProps={{
              options: currencyList,
              onChange: (value) => console.log('To currency changed to:', value),
              placeholder: 'Currency',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CurrencyConverter;
