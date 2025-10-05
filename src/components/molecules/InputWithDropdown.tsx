import Input from '../atoms/Input';
import Select from '../atoms/Select';
import type { InputFieldProps } from '../atoms/Input';
import type { SelectProps } from '../atoms/Select';

export interface InputWithDropdownProps {
  inputProps: InputFieldProps;
  selectProps: SelectProps;
}

const InputWithDropdown = ({ inputProps, selectProps }: InputWithDropdownProps) => (
  <div className='flex gap-2'>
    <Input
      {...inputProps}
    />
    <Select
      {...selectProps}
    />
  </div>
)

export default InputWithDropdown;