import { css } from "@emotion/react";

import styled from "@emotion/styled";
import { media } from "@/styles/mediaBrakepoints";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: ${({ hasError }) => (hasError ? 56 : 40)}px;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
`;

export const Recommended = styled.h4``;

export const LabelInfo = styled.h4`
  display: flex;
  align-items: center;
  color: var(--White);
  font-size: 12px;
  line-height: 16px;
  padding-top: 4px;
  & svg {
    margin-right: 6px;
  }

  ${(props) => props.hasError && `opacity: 0`};
`;

export const InputElement = styled.input(
  ({ isShowSuccess, isError, hasRightIcon, isLightDisabled }) => css`
    border: 1px solid ${isShowSuccess ? "green" : isError ? "red" : "grey"};
    padding: ${hasRightIcon ? "10px 38px 10px 12px" : "10px 12px"};
    background: rgb(238, 225, 225);
    border: 1px solid rgb(174, 174, 174);
    font-size: 14px;
    line-height: 120%;
    font-weight: 500;
    color: white;
    transition: border 0.3s ease;
    border-radius: 8px;
    outline: none;
    width: 100%;

    &:focus,
    &:focus-visible {
      ${!isShowSuccess && !isError && "border-color: grey"};
    }
    &::placeholder {
      color: grey;
    }

    &:disabled {
      opacity: 1;
      color: ${isLightDisabled ? "grey" : "grey"};
    }

    &:disabled::placeholder {
      color: grey;
    }
  `
);

export const Text = styled.div`
  color: ${({ isError }) => (isError ? "red" : "white")};
  min-height: 16px;
  font-size: 12px;
  line-height: 120%;
  font-weight: 400;
  padding-top: 1px;
`;

export const RightIconWrapper = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  right: 12px;
  top: calc(50% - 10px);
`;

export const ShowPass = styled(RightIconWrapper)`
  cursor: pointer;
  ${media.hover} {
    &:hover {
      svg {
        & path {
          transition: fill 0.3s ease;
          fill: white;
        }
      }
    }
  }
`;

export const Input = styled.input`
  flex: 1 1 auto;
  width: 100%;
  height: 44px;
  font-weight: 400;
  font-size: 14px;
  line-height: 120%;
  color: black;
  border-radius: 16px;
  cursor: initial;
  ::placeholder {
    color: grey;
  }
  &:focus {
    outline: none;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:focus {
    transition: background-color 0s 60000000s, color 0s 60000000s;
  }

  padding: ${(props) =>
    props.type === "password" || props.show
      ? `0px 48px 0 16px`
      : props.doubleIcon
      ? `0px 48px`
      : "0px 16px"};
`;

export const ButtonShow = styled.button`
  display: flex;
  flex-direction: table-column;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 16px;
  bottom: 7px;
  width: 16px;
`;

export const Error = styled.div``;
