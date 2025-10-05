import InputWithDropdown from '../molecules/InputWithDropdown';
import { Button, Label, ListBox, ListBoxItem, Popover, Select, SelectValue } from 'react-aria-components';

const CURRENCIES = [
  { name: 'USD', value: 'usd' },
  { name: 'EUR', value: 'eur' },
  { name: 'GBP', value: 'gbp' }
];  

const CurrencyConverter = () => {
  return (
    <div className="px-4 py-15">
      <h1 className="text-2xl font-bold mb-4 text-center">Currency Converter</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-15 max-w-[500px] mx-auto">
        <div>
          <label className="block text-sm font-medium mb-1 text-left" htmlFor="from-currency">
            From
          </label>
          <InputWithDropdown
            inputProps={{ placeholder: 'Amount', type: 'number' }}
            selectProps={{
              options: CURRENCIES,
              onChange: (value) => console.log('To currency changed to:', value),
              placeholder: 'Currency'
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-left" htmlFor="to-currency">
            To
          </label>
          <InputWithDropdown
            inputProps={{ placeholder: 'Amount', type: 'number' }}
            selectProps={{
              options: CURRENCIES,
              onChange: (value) => console.log('To currency changed to:', value),
              placeholder: 'Currency'
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CurrencyConverter;
