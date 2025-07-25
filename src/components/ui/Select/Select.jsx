import { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import IconArrow from "~/assets/icons/arrow-down.svg";
import { useOnClickOutside } from "~/common/hooks";
import { List, VirtualList } from "./components";
import * as S from "./styles";

const Select = ({
  items,
  helperText,
  placeholder,
  fieldState,
  disabled,
  field,
  withError,
  tabIndex,
  useVirtual = false,
  useSearch = false,
  disabledIcon,
  isLightDisabled,
  getLeftIcon,
  selectValue,
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const wrapperRef = useRef < HTMLDivElement > null;
  const inputRef = useRef < HTMLInputElement > null;

  const { onChange, value } = field;
  const { error } = fieldState;

  const isDisabled = disabled || field.disabled;

  useOnClickOutside(wrapperRef, () => {
    setIsOpenMenu(false);
    setInputValue("");
  });

  const filterItems = () => {
    if (useSearch && inputValue) {
      return items.filter((item) =>
        item.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    }
    return items;
  };

  const handleClickSelect = () => {
    if (!isDisabled) {
      inputRef.current?.focus();
      setIsOpenMenu((prev) => !prev);
    }
  };

  const handleChangeItem = (item) => {
    onChange(selectValue ? item.value : item);
    setIsOpenMenu(false);
    setInputValue("");
  };

  const handleChangeInput = (e) => {
    if (!isOpenMenu) {
      setIsOpenMenu(true);
    }
    setInputValue(e.currentTarget.value);
  };

  return (
    <S.Wrapper ref={wrapperRef} withError={withError}>
      <S.Select
        isOpen={isOpenMenu}
        isDisabled={isDisabled}
        onClick={handleClickSelect}
        isError={withError && Boolean(error || helperText)}
      >
        {getLeftIcon && value && (
          <S.LeftIcon src={getLeftIcon(value)} width={18} height={18} alt="" />
        )}
        {!inputValue && (
          <S.Value
            isSelected={value?.label}
            isDisabled={isDisabled}
            isLightDisabled={isLightDisabled}
          >
            {value?.label || value || placeholder}
          </S.Value>
        )}

        {useSearch && (
          <S.Input
            ref={inputRef}
            value={inputValue}
            tabIndex={tabIndex}
            disabled={isDisabled}
            onChange={handleChangeInput}
          />
        )}
        {(!disabled || !disabledIcon) && (
          <S.IconWrapper>
            <IconArrow />
          </S.IconWrapper>
        )}
      </S.Select>
      {withError && (error || helperText) && (
        <S.Text isError={Boolean(error)}>
          {error ? error.message : helperText}
        </S.Text>
      )}
      {useVirtual ? (
        <VirtualList
          items={filterItems()}
          isOpenMenu={isOpenMenu}
          onChangeItem={handleChangeItem}
        />
      ) : (
        <List
          items={filterItems()}
          getLeftIcon={getLeftIcon}
          wrapperRef={wrapperRef}
          isOpenMenu={isOpenMenu}
          onChangeItem={handleChangeItem}
        />
      )}
    </S.Wrapper>
  );
};

const SelectController = ({ name, rules, defaultValue, ...rect }) => (
  <Controller
    name={name}
    rules={rules}
    defaultValue={defaultValue}
    render={(renderProps) => <Select {...renderProps} {...rect} />}
  />
);

export default SelectController;
