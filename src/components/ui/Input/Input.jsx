'use client';
import { forwardRef, useId, useState } from 'react';
import { get, useFormContext } from 'react-hook-form';
import { IconEye, IconEyeOff } from '@/components/icons';
import * as S from './styles';

const assignRef = (ref, node) => {
  if (typeof ref === 'function') ref(node);
  else if (ref) ref.current = node;
};
const notify = (handlers, event) => {
  for (const handler of new Set(handlers)) {
    if (typeof handler === 'function') handler(event);
  }
};

const Input = forwardRef(function Input({
  autocomplete = 'off', autoComplete, name, placeholder, prefix, label, rules,
  step, type = 'text', form, max, maxLength, icon, doubleIcon, event, info,
  disabled = false, idInput, id, onValueChange, onChange, defaultValue, defaultError,
  onBlurHandler, onBlur, onFocus, className, isDarken, tabIndex, enterKeyHint = 'enter',
  onKeyDown, isBorder, value, variant, standalone = false, on, isVisible, isOpenList, isOne, ...nativeProps
}, forwardedRef) {
  const context = useFormContext();
  const generatedId = useId();
  const inputId = id || idInput || generatedId;
  const [show, setShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const plain = variant === 'plain' || ['checkbox', 'radio', 'file', 'hidden'].includes(type);
  // Controller / explicit register props already supply their own handlers and ref.
  const autoRegister = context?.register && name && !standalone && !onChange && !forwardedRef &&
    !(value !== undefined && onValueChange);
  const registered = autoRegister ? context.register(name, rules) : {};
  const error = context?.formState?.errors && name && !standalone
    ? get(context.formState.errors, name) || defaultError : defaultError;
  const inputProps = {
    ...nativeProps, ...registered, name, id: inputId, type: show ? 'text' : type,
    placeholder, disabled, defaultValue, value, max, form: typeof form === 'string' ? form : undefined,
    maxLength: maxLength ?? (plain ? undefined : 255),
    step: step ?? (plain ? undefined : 1),
    autoComplete: autoComplete ?? autocomplete, tabIndex, enterKeyHint, onKeyDown,
    ref: node => { assignRef(registered.ref, node); assignRef(forwardedRef, node); },
    onChange: e => notify([onValueChange, onChange, registered.onChange], e),
    onBlur: e => { setIsFocused(false); notify([onBlurHandler, onBlur, registered.onBlur], e); },
    onFocus: e => { setIsFocused(true); onFocus?.(e); },
  };
  if (plain) return <input {...inputProps} className={className} />;

  return (
    <S.Wrapper className={className || 'base_input'}>
      <S.InputWrapper isDarken={isDarken} isError={error} doubleIcon={doubleIcon}
        isFocused={isFocused} disabled={disabled} isBorder={isBorder}>
        <S.Label as="label" htmlFor={inputId}>{label}</S.Label>
        {prefix && <S.Prefix aria-hidden="true">{prefix}</S.Prefix>}
        {icon}
        <S.Input {...inputProps} hasPrefix={!!prefix} doubleIcon={doubleIcon} show={show} label={label} error={error} />
        <b>{doubleIcon}</b>
        {type === 'password' && <S.ButtonShow type="button" aria-label={show ? 'Hide password' : 'Show password'} onClick={() => setShow(!show)}>
          {show ? <IconEye /> : <IconEyeOff />}
        </S.ButtonShow>}
        {event}
      </S.InputWrapper>
      {info && <S.LabelInfo hasError={error}>{info}</S.LabelInfo>}
      {error && <S.Error>{error.message || (typeof error === 'string' ? error : '')}</S.Error>}
    </S.Wrapper>
  );
});

// Shared control for existing styled fields and native file/checkbox/date inputs.
// It keeps the original DOM shape and does not register itself in an enclosing form.
export const InputControl = forwardRef(function InputControl(props, ref) {
  return <Input standalone {...props} ref={ref} variant="plain" />;
});

export default Input;
