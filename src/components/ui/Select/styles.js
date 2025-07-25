import { css } from "@emotion/react";
import styled from "@emotion/styled";

import Image from "next/image";
import { media } from "~/styles/MediaQuery";
import { scrollSet } from "~/styles/StyleGroups";
import { getSelectStyledProps } from "./utils";

export const Wrapper = styled.div(
  ({ withError }) => css`
    position: relative;
    width: 100%;
    min-height: ${withError ? 56 : 40}px;
  `
);

export const Select = styled.div(
  ({ isDisabled, isOpen, isError }) => css`
    //Default state
    ${getSelectStyledProps("var(--ost-grey-400)")};
    //Opened menu
    ${isOpen && getSelectStyledProps("#fff")};
    //Disabled state
    ${isDisabled && getSelectStyledProps("var(--ost-grey-500)")};

    pointer-events: ${isDisabled ? "none" : "auto"};
    display: flex;
    height: 40px;
    width: 100%;
    border-radius: 8px;
    align-items: center;
    justify-content: space-between;
    padding-inline: 12px;
    font-size: var(--ost-fs-sm);
    font-weight: 500;
    line-height: var(--ost-fs-sm);
    background-color: var(--ost-grey-600);
    position: relative;
    cursor: pointer;
    border: 1px solid transparent;

    ${media.hover} {
      &:hover {
        background-color: var(--ost-grey-550);
      }
    }

    ${isError &&
    css`
      border-color: var(--ost-red-400);
    `}
  `
);

export const LeftIcon = styled(Image)`
  width: 18px;
  height: 18px;
  margin-right: 8px;
`;
export const IconWrapper = styled.div`
  margin-left: auto;
  svg {
    width: 18px;
    height: 18px;
  }
`;
export const MenuList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
  max-height: 160px;
  ${scrollSet};
  padding-right: 4px;
`;
export const VirtualList = styled(MenuList)`
  max-height: 154px;
`;

export const Menu = styled.div(
  ({ isOpen }) => css`
    display: ${isOpen ? "flex" : "none"};
    width: 100%;
    position: absolute;
    flex-direction: column;
    padding: 4px 0 4px 4px;
    left: 0;
    top: 48px;
    border-radius: 8px;
    background: var(--ost-grey-600);
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.3);
    z-index: 3;
  `
);

export const VirtualContent = styled.div(
  ({ height }) => css`
    height: ${height}px;
    min-height: ${height}px;
    width: 100%;
    position: relative;
  `
);

export const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 9px;
  color: var(--ost-grey-400);
  font-size: var(--ost-fs-sm);
  font-weight: 500;
  line-height: var(--ost-lh-sm);
  border-radius: 8px;
  cursor: pointer;
  min-height: 40px;

  :hover {
    background-color: var(--ost-grey-550);
  }
`;

export const VirtualItem = styled(Item)(
  ({ top, height }) => css`
    top: ${top}px;
    height: ${height}px;
    width: 100%;
    position: absolute;
  `
);

export const Text =
  styled.div <
  T.ITextStyledProps >
  `
  color: var(
    ${({ isError }) => (isError ? "--ost-red-400" : "--ost-white")}
  );
  min-height: 16px;
  font-size: var(--ost-fs-2xs);
  line-height: var(--ost-lh-2xs);
  font-weight: 400;
  padding-top: 1px;
`;

export const Input = styled.input`
  z-index: 1;
  outline: none;
  color: inherit;
  position: absolute;
  max-width: calc(100% - 42px);
`;

export const Value = styled.div(
  ({ isSelected, isDisabled, isLightDisabled }) => css`
    color: var(
      ${isDisabled
        ? isLightDisabled
          ? "--ost-grey-400"
          : "--ost-grey-500"
        : isSelected
        ? "--ost-white"
        : "--ost-grey-400"}
    );
  `
);

export const EmptyState = styled.div`
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-inline: 6px;
  color: var(--ost-grey-200);
  font-size: var(--ost-fs-sm);
  line-height: var(--ost-lh-sm);
  font-weight: 500;
`;
