import styled from "@emotion/styled";
import { media } from "@/styles/mediaBrakepoints";

export const Wrap = styled.div`
  position: relative;
  width: 100%;
`;

export const Label = styled.div`
    position: absolute;
    top: 0;
    left: 18px;
    font-size: 8px;
`;

export const Input = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border-radius: 16px;
  border: 1px solid grey;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 1px grey;
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.12);
  max-height: 240px;
  overflow-y: auto;
  z-index: 20;
`;

export const Option = styled.div`
  padding: 10px 12px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 10px;
  background: ${({ $selected }) => ($selected ? "#eef2ff" : "transparent")};

  &:hover {
    background: #f3f4f6;
  }
`;

export const Check = styled.span`
  color: #3b82f6;
`;

export const Empty = styled.div`
  padding: 12px;
  color: #6b7280;
`;
