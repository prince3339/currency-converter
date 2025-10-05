import { Button, Label, ListBox, ListBoxItem, Popover, Select, SelectValue } from 'react-aria-components';
import { ChevronDown } from 'lucide-react';
import type { BaseOption } from '../../types/types';

export interface SelectProps<T extends BaseOption = BaseOption> {
  label?: string;
  options: T[];
  onChange?: (value: string | null, option?: T) => void;
  placeholder?: string;
  isRequired?: boolean;
}

const EnhancedSelect = <T extends BaseOption>({ label, options, onChange, placeholder, isRequired } : SelectProps<T>) => (
  <Select
    aria-label='select'
    onChange={(key) => onChange?.(key as string)}
    placeholder={placeholder}
    isRequired={isRequired}
    >
    {label && <Label>{label}</Label>}
    <Button
      className="flex items-center justify-between w-[180px] rounded-lg px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)] border border-gray-300 shadow-sm dark:bg-gray-800 bg-gray-600 text-white/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-base/6 sm:text-sm/6"
    >
      <SelectValue className='truncate' />
      <span aria-hidden="true">
        <ChevronDown size={16} />
      </span>
    </Button>
    <Popover className="min-w-(--trigger-width) bg-gray-700 rounded-lg">
      <ListBox className="outline-hidden p-1 max-h-[inherit] overflow-auto [clip-path:inset(0_0_0_0_round_.75rem)]">
        {options?.map(({ name, value }: BaseOption) => (
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