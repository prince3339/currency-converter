import {Button, Label, ListBox, ListBoxItem, Popover, Select, SelectValue} from 'react-aria-components';
import {ChevronDown} from 'lucide-react';

type Option = {
  name: string;
  value: string;
}

interface SelectProps {
  label: string;
  options: Option[];
}

const EnhancedSelect = ({ label, options } : SelectProps) => (
  <Select>
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