import {
  Meter as AriaMeter,
  MeterProps as AriaMeterProps,
  Form as RACForm,
  FormProps,
  LabelProps,
  Label as RACLabel,
  FieldErrorProps,
  FieldError as RACFieldError,
  ButtonProps,
  Button,
  TextProps
} from 'react-aria-components';
import './metor.scss';

export interface MeterProps extends AriaMeterProps {
  label?: string;
}


export function Form(props: FormProps) {
  return <RACForm {...props} />;
}

export function Label(props: LabelProps) {
  return <RACLabel {...props} />;
}

export function FieldError(props: FieldErrorProps) {
  return <RACFieldError {...props} />;
}

export function Description(props: TextProps) {
  return <p slot="description" className="field-description" {...props} />
}

export function FieldButton(props: ButtonProps) {
  return <Button {...props} className="field-Button" />;
}

export function Meter({  ...props }: MeterProps) {
  return (
    (
      <AriaMeter {...props}>
        {({ percentage }) => (
          <>
            {/* <Label>{label}</Label>
            <span className="value">{valueText}</span> */}
            <div className="track inset">
              <div
                className="fill"
                style={{
                  width: percentage + '%',
                  '--fill-color': percentage < 70 ? 'var(--green)' : percentage < 90 ? 'var(--orange)' : 'var(--red)'
                } as any} />
            </div>
          </>
        )}
      </AriaMeter>
    )
  );
}
