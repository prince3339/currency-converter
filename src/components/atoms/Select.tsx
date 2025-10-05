import { Button, Label, ListBox, ListBoxItem, Popover, Select, SelectValue } from 'react-aria-components';
import {ChevronDown} from 'lucide-react';

export type Option = {
  name: string;
  value: string;
}

export interface SelectProps {
  label?: string;
  options: Option[];
  onChange?: (value: string | null) => void;
  placeholder?: string;
}

const EnhancedSelect = ({ label, options, onChange, placeholder } : SelectProps) => (
  <Select
    aria-label='select'
    onChange={(key) => onChange?.(key as string)}
    placeholder={placeholder}
    >
    {label && <Label>{label}</Label>}
    <Button
      className="flex items-center justify-between w-full rounded-lg px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)] border border-gray-300 shadow-sm dark:bg-gray-800 bg-gray-600 text-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-base/6 sm:text-sm/6"
    >
      <SelectValue />
      <span aria-hidden="true">
        <ChevronDown size={16} />
      </span>
    </Button>
    <Popover className="min-w-(--trigger-width) bg-gray-700 rounded-lg">
      <ListBox className="outline-hidden p-1 max-h-[inherit] overflow-auto [clip-path:inset(0_0_0_0_round_.75rem)]">
        {options?.map(({ name, value }: Option) => (
          <ListBoxItem
            key={value}
            id={value}
            className="text-base/6 border-b-1-gray-800 last:border-0 data-[selected]:bg-gray-800 rounded px-2 py-1 cursor-pointer hover:bg-gray-600"
          >
            {name}
          </ListBoxItem>
        ))}
      </ListBox>
    </Popover>
  </Select>
)
export default EnhancedSelect;