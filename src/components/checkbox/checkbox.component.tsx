import { Checkbox as AriaCheckbox, CheckboxProps } from "react-aria-components";
import "./checkbox.scss";
import { IconComponent } from "../icon";

export function Checkbox({
  children,
  ...props
}: Omit<CheckboxProps, "children"> & {
  children?: React.ReactNode;
}) {
  return (
    <AriaCheckbox {...props}>
      {({ isSelected, isIndeterminate }) => (
        <>
          <div className="indicator">
            {isIndeterminate ? (
              ''
            ) : (
              isSelected && <IconComponent name="check" cursor="pointer" />
            )}
          </div>
          {children}
        </>
      )}
    </AriaCheckbox>
  );
}