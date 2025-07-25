import lget from "lodash/get";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { IconEye, IconEyeOff } from "@/components/icons";
import * as S from "./styles";

const Input = ({
  autocomplete = "off",
  name,
  placeholder,
  lable,
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
  existLable = true,
  info,
  disabled = false,
  onClickGaEvent,
  idInput = "",
  onChange,
  defaultValue,
  defaultError,
  fullError,
  className,
  isDarken,
  tabIndex,
  enterKeyHint = "enter",
  onKeyDown,
}) => {
  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext();
  const hasError = lget(errors, name);
  const [show, setShow] = useState(event || false);
  const { onBlur } = register;
  const [isFocused, setIsFocused] = useState(false);

  const onBlurHandler = (e) => {
    setIsFocused(false);
    if (typeof onClickGaEvent === "function") {
      onClickGaEvent(e);
    }
    if (typeof onBlur === "function") {
      onBlur(e);
    }
    if (focusedColor && form[name]) {
      const amount = (+e.target.value).toFixed(2);
      setForm({
        ...form,
        [name]: lable && existLable ? `${amount} ${lable} ` : amount,
      });
      setValue(name, amount);
    }
  };

  return (
    <S.Wrapper className={className || "base_input"}>
      <S.InputWrapper
        isDarken={isDarken}
        error={hasError}
        doubleIcon={doubleIcon}
        isFocused={isFocused}
        disabled={disabled}
      >
        {icon}
        {form ? (
          <>
            <S.Input
              disabled={disabled}
              doubleIcon={doubleIcon}
              step={step}
              show={show}
              maxLength={max}
              value={form[name]}
              placeholder={placeholder}
              lable={lable}
              autoComplete={autocomplete}
              onBlur={onBlur}
              autocomplete={autocomplete}
              type={show ? "text" : type}
              defaultValue={defaultValue}
              ariaLabelledby={name}
              {...register(name, {
                ...rules,
                onBlur: onBlurHandler,
                onChange: (e) => {
                  let value = e.target.value;
                  if (typeof onChange === "function") {
                    onChange({ target: { value } });
                  }
                  setForm({
                    ...form,
                    [name]: lable && existLable ? `${value} ${lable} ` : value,
                  });
                },
              })}
              onWheel={(e) => e.target.blur()}
              onFocus={() => setIsFocused(true)}
              tabIndex={tabIndex}
              enterKeyHint={enterKeyHint}
              id={idInput}
              onKeyDown={(event) => {
                if (typeof onKeyDown === "function") {
                  onKeyDown(event);
                }
              }}
            />
            <b>{doubleIcon}</b>
          </>
        ) : (
          <>
            <S.Input
              autocomplete={autocomplete}
              step={step}
              error={hasError}
              placeholder={placeholder}
              lable={lable}
              maxLength={max}
              disabled={disabled}
              onBlur={onBlur}
              show={show}
              type={show ? "text" : type}
              defaultValue={defaultValue}
              {...register(name, {
                ...rules,
                onBlur: onBlurHandler,
                onChange: (e) => {
                  let value = e.target.value;
                  if (type === "number") {
                    value = inputParser(value);
                  }
                  if (typeof onChange === "function") {
                    onChange({ target: { value } });
                  }
                },
              })}
              onWheel={(e) => e.target.blur()}
              onFocus={() => setIsFocused(true)}
              tabIndex={tabIndex}
              enterKeyHint={enterKeyHint}
              id={idInput}
              onKeyDown={(event) => {
                if (typeof onKeyDown === "function") {
                  onKeyDown(event);
                }
              }}
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
      {/* {hasError && (
        <S.Error fullError={fullError} className="error-message">
          {(renderInputError(hasError) || defaultError)?.replace(
            "NUMBER",
            rules?.[hasError?.type]
          )}
        </S.Error>
      )} */}
    </S.Wrapper>
  );
};

export default Input;
