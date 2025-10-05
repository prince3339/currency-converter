import { TextField, Label, Input } from 'react-aria-components';

export interface InputFieldProps {
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  type: string;
}

const InputField = ({ label, placeholder, onChange }: InputFieldProps) => (
  <TextField>
    {label && <Label>{label}</Label>}
    <Input
      placeholder={placeholder}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange?.(e.target.value)
      }
    />
  </TextField>
)

export default InputField;
