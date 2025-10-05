import { TextField, Label, Input } from 'react-aria-components';

export interface InputFieldProps {
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  type: string;
}

const InputField = ({ label, placeholder, onChange, type }: InputFieldProps) => (
  <TextField aria-label='input-field'>
    {label && <Label>{label}</Label>}
    <Input
      type={type}
      placeholder={placeholder}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange?.(e.target.value)
      }
      className="relative block w-full appearance-none rounded-lg px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)] text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-zinc-950/10 data-hover:border-zinc-950/20 dark:border-white/10 dark:data-hover:border-white/20 bg-transparent dark:bg-white/5 focus:outline-hidden data-invalid:border-red-500 data-invalid:data-hover:border-red-500 dark:data-invalid:border-red-600 dark:data-invalid:data-hover:border-red-600 data-disabled:border-zinc-950/20 dark:data-disabled:border-white/15 dark:data-disabled:bg-white/2.5 dark:data-hover:data-disabled:border-white/15 dark:scheme-dark"
    />
  </TextField>
)

export default InputField;
