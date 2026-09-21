import lget from "lodash/get";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { IconEye, IconEyeOff } from "@/components/icons";
import * as S from "./styles";

const Input = ({
  autocomplete = "off",
  name,
  placeholder,
  label,
  rules,
  step = 1,
  type,
  setForm,
  form,
  max = 255,
  icon,
  doubleIcon,
  focusedColor,
  event,
  existlabel = true,
  info,
  disabled = false,
  onClickGaEvent,
  idInput = "",
  onValueChange,
  defaultValue,
  defaultError,
  fullError,
  onBlurHandler,
  className,
  isDarken,
  tabIndex,
  enterKeyHint = "enter",
  onKeyDown,
  isBorder,
  // Добавили стандартное значение для использования без react-hook-form
  value,
}) => {
  // 1. Безопасно получаем контекст формы. Если его нет, деструктуризация не упадет.
  const context = useFormContext();
  const { register, formState } = context || {};
  const errors = formState?.errors;

  // 2. Ошибка берется либо из react-hook-form, либо из переданного пропса defaultError
  const hasError = errors && name ? lget(errors, name) : defaultError;
  
  const [show, setShow] = useState(event || false);
  const [isFocused, setIsFocused] = useState(false);

  // 3. Безопасная инициализация методов регистрации react-hook-form
  const inputRegister = register && name 
    ? register(name, {
        ...rules,
        onBlur: onBlurHandler,
        onChange: (e) => {
          if (typeof onValueChange === "function") {
            onValueChange(e);
          }
        },
      }) 
    : {};

  // 4. Единый обработчик изменений для поддержки обоих режимов
  const handleChange = (e) => {
    if (typeof onValueChange === "function") {
      onValueChange(e);
    }
    if (typeof inputRegister.onChange === "function") {
      inputRegister.onChange(e);
    }
  };

  // 5. Единый обработчик разфокусировки
  const handleBlur = (e) => {
    setIsFocused(false);
    if (typeof onBlurHandler === "function") {
      onBlurHandler(e);
    }
    if (typeof inputRegister.onBlur === "function") {
      inputRegister.onBlur(e);
    }
  };

  return (
    <S.Wrapper className={className || "base_input"}>
      <S.InputWrapper
        isDarken={isDarken}
        isError={hasError}
        doubleIcon={doubleIcon}
        isFocused={isFocused}
        disabled={disabled}
        isBorder={isBorder}
      >
        <S.Label>{label}</S.Label>
        {icon}
        {form ? (
          <>
            <S.Input
              name={name} 
              disabled={disabled}
              doubleIcon={doubleIcon}
              step={step}
              show={show}
              maxLength={max}
              placeholder={placeholder}
              label={label}
              autoComplete={autocomplete}
              type={show ? "text" : type}
              defaultValue={defaultValue}
              value={value}
              onFocus={() => setIsFocused(true)}
              tabIndex={tabIndex}
              id={idInput}
              onKeyDown={(event) => {
                if (typeof onKeyDown === "function") {
                  onKeyDown(event);
                }
              }}
              {...inputRegister}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <b>{doubleIcon}</b>
          </>
        ) : (
          <>
            <S.Input
              name={name} 
              autocomplete={autocomplete}
              step={step}
              error={hasError}
              placeholder={placeholder}
              label={label}
              maxLength={max}
              disabled={disabled}
              show={show}
              type={show ? "text" : type}
              defaultValue={defaultValue}
              value={value}
              onFocus={() => setIsFocused(true)}
              tabIndex={tabIndex}
              enterKeyHint={enterKeyHint}
              id={idInput}
              onKeyDown={(event) => {
                if (typeof onKeyDown === "function") {
                  onKeyDown(event);
                }
              }}
              {...inputRegister}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <b>{doubleIcon}</b>
          </>
        )}
        {type === "password" && (
          <S.ButtonShow
            title=""
            onClick={() => {
              setShow(!show);
            }}
            type="button"
          >
            {show ? <IconEye /> : <IconEyeOff />}
          </S.ButtonShow>
        )}
        {event}
      </S.InputWrapper>
      {info && <S.LabelInfo hasError={hasError}>{info}</S.LabelInfo>}
      {hasError && (
        <S.Error>
         {hasError.message || (typeof hasError === 'string' ? hasError : '')}
        </S.Error>
      )}
    </S.Wrapper>
  );
};

export default Input;
