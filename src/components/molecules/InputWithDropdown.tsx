import Input from '../atoms/Input';
import Select from '../atoms/Select';
import type { InputFieldProps } from '../atoms/Input';
import type { SelectProps } from '../atoms/Select';

export interface InputWithDropdownProps {
  inputProps: InputFieldProps;
  selectProps: SelectProps;
}

const InputWithDropdown = ({ inputProps, selectProps }: InputWithDropdownProps) => {
  const { label: inputLabel, placeholder, onChange: onInputChange, type } = inputProps;
  const { label: selectLabel, options, onChange: onSelectChange } = selectProps;
  return (
    <div className='flex gap-2'>
      <Input
        type={type}
        label={inputLabel}
        placeholder={placeholder}
        onChange={onInputChange}
      />
      <Select
        label={selectLabel}
        options={options}
        onChange={onSelectChange}
      />
    </div>
  );
};

export default InputWithDropdown;