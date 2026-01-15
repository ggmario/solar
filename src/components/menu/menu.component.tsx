import React from 'react';
import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuSection as AriaMenuSection,
  MenuTrigger as AriaMenuTrigger,
  SubmenuTrigger as AriaSubmenuTrigger,
  MenuItemProps,
  MenuProps,
  MenuSectionProps,
  MenuTriggerProps,
  SubmenuTriggerProps,
  Popover,
  Text,
  Header as AriaHeader,
  Collection
} from 'react-aria-components';

import './menu.component.scss';

const MenuComponent = Object.assign(
  function Menu<T extends object>(props: MenuProps<T>) {
    return (
      <AriaMenu {...props} className="react-aria-Menu">
        {props.children}
      </AriaMenu>
    );
  },
  {
    Trigger: ({ children, ...props }: MenuTriggerProps) => {
      const [trigger, menu] = React.Children.toArray(children) as [React.ReactElement, React.ReactElement];
      return (
        <AriaMenuTrigger {...props}>
          {trigger}
          <Popover>
            {menu}
          </Popover>
        </AriaMenuTrigger>
      );
    },

    Item: (props: Omit<MenuItemProps, 'children'> & { children?: React.ReactNode }) => {
      const textValue = props.textValue || (typeof props.children === 'string' ? props.children : undefined);

      return (
        <AriaMenuItem 
          {...props} 
          textValue={textValue} 
          className={({ isFocused, isSelected }) => 
            `react-aria-MenuItem ${isFocused ? 'focused' : ''} ${isSelected ? 'selected' : ''}`
          }
        >
          <Text slot="label">{props.children}</Text>
        </AriaMenuItem>
      );
    },

    Section: <T extends object>({ title, children, ...props }: MenuSectionProps<T> & { title?: string }) => {
      return (
        <AriaMenuSection {...props} className="react-aria-MenuSection">
          {title && <AriaHeader>{title}</AriaHeader>}
          <Collection>
            {children as React.ReactNode}
          </Collection>
        </AriaMenuSection>
      );
    },

    Submenu: ({ children, ...props }: SubmenuTriggerProps) => {
      const [trigger, menu] = React.Children.toArray(children) as [React.ReactElement, React.ReactElement];
      return (
        <AriaSubmenuTrigger {...props}>
          {trigger}
          <Popover offset={-2} crossOffset={-4}>
            {menu}
          </Popover>
        </AriaSubmenuTrigger>
      );
    }
  }
);

// named export와 default export 모두 제공
export { MenuComponent };
export default MenuComponent;