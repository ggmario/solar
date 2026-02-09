import React, { useMemo, useState } from 'react';
import { TextField, Label, Input, TextArea, Group } from 'react-aria-components';
import { ButtonComponent, FieldButton, IconComponent, Select, SelectItem } from '@/components';
import './search-fields.component.scss';

export type FieldType = 'text' | 'select' | 'date' | 'search-text' | 'password' | 'textarea';

export interface SearchFieldConfig {
  key: string;
  label?: string;
  type?: FieldType;
  options?: { label: string; value: any }[];
  onSearchClick?: (value: any) => void;
  isBreak?: boolean;
  required?: boolean;
  height?: number;
  gridSize?: number;
  searchText?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  width?: number | string;
}

interface SearchFieldsProps {
  config: (SearchFieldConfig | SearchFieldConfig[])[];
  values: Record<string, any>;
  onChange: (key: string, value: any) => void;
  rowSpacing?: number;
  columnSpacing?: number;
  spacing?: number;
  gridSize?: number;
}

export const SearchFields = ({
  config,
  values,
  onChange,
  rowSpacing = 12,
  columnSpacing = 40,
}: SearchFieldsProps) => {
  const rows = useMemo(() => {
    const result: (SearchFieldConfig | SearchFieldConfig[])[][] = [[]];
    config.forEach((item) => {
      result[result.length - 1].push(item);
      if (!Array.isArray(item) && item.isBreak) {
        result.push([]);
      }
    });
    return result.filter((row) => row.length > 0);
  }, [config]);

  const renderControl = (field: SearchFieldConfig) => {
    const { disabled = false, readOnly = false, width } = field;

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    if (field.type === 'select') {
      return (
        <Select
          selectedKey={values[field.key] ?? null}
          onSelectionChange={(key) => onChange(field.key, key)}
          isDisabled={disabled}
          placeholder={field.placeholder}
          style={{
            width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
          }}
        >
          {field.options?.map((opt) => (
            <SelectItem key={opt.value} id={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </Select>
      );
    }

    if (field.type === 'text' || field.type === 'search-text') {
      return (
        <TextField
          value={values[field.key] || ''}
          onChange={(value) => onChange(field.key, value)}
          isDisabled={disabled}
          isReadOnly={readOnly}
          style={{
            width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
          }}
        >
          <Input placeholder={field.placeholder || '입력하세요'} />
          {field.type === 'search-text' && (
            <ButtonComponent
              variant="contained"
              onPress={() => field.onSearchClick?.(values[field.key])}
            >
              {field.searchText || '검색'}
            </ButtonComponent>
          )}
        </TextField>
      );
    }

    if (field.type === 'password') {
      return (
        <TextField
          value={values[field.key] || ''}
          onChange={(value) => onChange(field.key, value)}
          isDisabled={disabled}
        >
          <Group>
            <Input
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="비밀번호를 입력해 주세요"
              style={{ paddingRight: 56 }}
            />

            <FieldButton
              aria-label={isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
              onClick={togglePasswordVisibility}
            >
              <IconComponent name={isPasswordVisible ? 'eye' : 'eye_off'} />
            </FieldButton>
          </Group>
        </TextField>
      );
    }

    if (field.type === 'textarea') {
      return (
        <TextField
          value={values[field.key] || ''}
          onChange={(value) => onChange(field.key, value)}
          isDisabled={disabled}
        >
          <TextArea
            placeholder={field.placeholder || '설명을 입력하세요'}
            style={field.height ? { height: field.height } : undefined}
          />
        </TextField>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        rowGap: `${rowSpacing}px`,
        columnGap: `${columnSpacing}px`,
        alignItems: 'start',
      }}
    >
      {config.map((item, index) => {
        const isArray = Array.isArray(item);
        const firstField = isArray ? item[0] : item;

        // gridSize가 2.4 등 소수점일 경우를 대비해 span 계산
        const gridCols = Math.round(firstField.gridSize || 2.4);

        return (
          <React.Fragment key={`field-group-${index}`}>
            <div style={{ gridColumn: `span ${gridCols}` }}>
              {firstField.label && (
                <Label style={{ display: 'block', marginBottom: 'var(--spacing-4)' }}>
                  {firstField.label}
                  {firstField.required && (
                    <span style={{ color: 'var(--point-pink-50)', marginLeft: 'var(--spacing)' }}>
                      *
                    </span>
                  )}
                </Label>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                {isArray
                  ? item.map((subField) => (
                      <div key={subField.key} style={{ flex: subField.gridSize || 1, minWidth: 0 }}>
                        {renderControl(subField)}
                      </div>
                    ))
                  : renderControl(item as SearchFieldConfig)}
              </div>
            </div>

            {/* 🔥 isBreak가 true일 때 12컬럼을 다 차지하는 빈 요소를 넣어 줄바꿈 유도 */}
            {!isArray && item.isBreak && <div style={{ height: 0, border: 'none' }} />}
          </React.Fragment>
        );
      })}
    </div>
  );
};
