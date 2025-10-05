import Input from '../atoms/Input';
import Select from '../atoms/Select';

const InputWithDropdown = () => {
  return (
    <div>
      <Input
        label="Amount"
        placeholder="Enter amount"
        onChange={(value) => console.log(value)}
      />
      <Select
        label="Currency"
        options={[{ name: 'USD', value: 'usd' }, { name: 'EUR', value: 'eur' }]}
      />
    </div>
  );
};

export default InputWithDropdown;