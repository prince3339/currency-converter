import { Button, Label, ListBox, ListBoxItem, Popover, Select, SelectValue } from 'react-aria-components';
import {ChevronDown} from 'lucide-react';

export type Option = {
  name: string;
  value: string;
}

export interface SelectProps {
  label: string;
  options: Option[];
  onChange?: (value: string | null) => void;
}

const EnhancedSelect = ({ label, options, onChange } : SelectProps) => (
  <Select onChange={(key) => onChange?.(key as string)} >
    <Label>{label}</Label>
    <Button>
      <SelectValue />
      <span aria-hidden="true">
        <ChevronDown size={16} />
      </span>
    </Button>
    <Popover>
      <ListBox>
        {options?.map(({ name, value }: Option) => (
          <ListBoxItem key={value} id={value}>{name}</ListBoxItem>
        ))}
      </ListBox>
    </Popover>
  </Select>
)
export default EnhancedSelect;