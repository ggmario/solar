// src/components/table/table.component.tsx
import type * as React from "react";
import {
  Collection,
  Column as AriaColumn,
  type ColumnProps as AriaColumnProps,
  Row as AriaRow,
  type RowProps,
  Table as AriaTable,
  TableHeader as AriaTableHeader,
  type TableHeaderProps,
  useTableOptions,
  type TableBodyProps,
  TableBody as AriaTableBody,
  type CellProps,
  Cell as AriaCell,
  TableLoadMoreItem as AriaTableLoadMoreItem,
  type TableLoadMoreItemProps,
} from "react-aria-components";
import "./table.scss";
import { Checkbox } from "@components";

type TableType = "horizontal" | "vertical";

// ✅ AriaTable의 실제 props를 React에서 뽑아옴 (버전 상관없이 안전)
type AriaTableComponentProps = React.ComponentProps<typeof AriaTable>;

export type TableProps = AriaTableComponentProps & {
  type?: TableType;
  cellWidth?: number;
};

export function Table({
  type = "horizontal",
  cellWidth = 160,
  style,
  ...props
}: TableProps) {
  return (
    <AriaTable
      {...props}
      data-table-type={type}
      style={
        {
          ...style,
          ...(type === "vertical" ? { "--label-width": `${cellWidth}px` } : {}),
        } as React.CSSProperties
      }
    />
  );
}

export interface ColumnProps extends AriaColumnProps {
  allowsResizing?: boolean;
}

export function Column(
  props: Omit<ColumnProps, "children"> & { children?: React.ReactNode },
) {
  return <AriaColumn {...props} className="react-aria-Column button-base" />;
}

export function TableHeader<T extends object>({
  columns,
  children,
  ...otherProps
}: TableHeaderProps<T>) {
  const { selectionBehavior, selectionMode, allowsDragging } =
    useTableOptions();

  return (
    <AriaTableHeader {...otherProps}>
      {allowsDragging && (
        <AriaColumn
          width={20}
          minWidth={20}
          style={{ width: 20 }}
          className="react-aria-Column button-base"
        />
      )}

      {selectionBehavior === "toggle" && (
        <AriaColumn
          width={32}
          minWidth={32}
          style={{ width: 32 }}
          className="react-aria-Column button-base"
        >
          {selectionMode === "multiple" && <Checkbox slot="selection" />}
        </AriaColumn>
      )}

      <Collection items={columns}>{children}</Collection>
    </AriaTableHeader>
  );
}

export function Row<T extends object>({
  id,
  columns,
  children,
  ...otherProps
}: RowProps<T>) {
  const { selectionBehavior } = useTableOptions();

  return (
    <AriaRow id={id} {...otherProps}>
      {selectionBehavior === "toggle" && (
        <Cell>
          <Checkbox slot="selection" />
        </Cell>
      )}
      <Collection items={columns}>{children}</Collection>
    </AriaRow>
  );
}

export function TableBody<T extends object>(props: TableBodyProps<T>) {
  return <AriaTableBody {...props} />;
}

export function Cell(props: CellProps) {
  return <AriaCell {...props} />;
}

export function TableLoadMoreItem(props: TableLoadMoreItemProps) {
  return (
    <AriaTableLoadMoreItem {...props}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    </AriaTableLoadMoreItem>
  );
}
