import React from 'react';
import {
  ListBoxItemProps,
  Select as AriaSelect,
  SelectProps as AriaSelectProps,
  SelectValue,
  ValidationResult,
  ListBoxProps,
  Button,
  Label,
  FieldError,
  Popover,
  ListBox,
  Text,
  SelectionMode,
} from 'react-aria-components';
import './select.scss'; 
import { DropdownItem, DropdownListBox } from './ListBox';
import { IconComponent } from '@components';


export interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, 'children' | 'selectionMode'> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
  selectionMode?: SelectionMode; 
}

export function Select<T extends object>({
  label,
  placeholder,
  description,
  errorMessage,
  children,
  items,
  selectionMode = 'single',
  ...props
}: SelectProps<T>) {
  return (
    <AriaSelect 
      {...props} 
      selectionMode={selectionMode as 'single'}
      aria-label={label || props['aria-label'] || placeholder} 
    >
      {label && <Label>{label}</Label>}
      <Button>
        <SelectValue />
        <IconComponent name="arrow_down" />
      </Button>
      
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      
      <Popover className="select-popover">
        <ListBox 
          items={items} 
          selectionMode={selectionMode}
        >
          {children}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}

export function SelectListBox<T extends object>(props: ListBoxProps<T>) {
  return <DropdownListBox {...props} />;
}

export function SelectItem(props: ListBoxItemProps) {
 return <DropdownItem {...props} />;
}