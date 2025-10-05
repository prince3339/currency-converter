import InputWithDropdown from '../molecules/InputWithDropdown';

const CURRENCIES = [
  { name: 'USD', value: 'usd' },
  { name: 'EUR', value: 'eur' },
  { name: 'GBP', value: 'gbp' }
];  

const CurrencyConverter = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Currency Converter</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="from-currency">
            From
          </label>
          <InputWithDropdown
            inputProps={{ placeholder: 'Amount', type: 'number' }}
            selectProps={{
              label: 'Currency',
              options: CURRENCIES,
              onChange: (value) => console.log('From currency changed to:', value),
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="to-currency">
            To
          </label>
          <InputWithDropdown
            inputProps={{ placeholder: 'Amount', type: 'number' }}
            selectProps={{
              label: 'Currency',
              options: CURRENCIES,
              onChange: (value) => console.log('To currency changed to:', value),
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CurrencyConverter;
