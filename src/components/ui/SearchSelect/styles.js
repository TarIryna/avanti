import styled from "@emotion/styled";

export const Wrapper = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 90%;
  display: block;
  height: 28px;
  padding: 0 16px;
  border-radius: 12px;
  position: absolute;
  top: 50%;
  left: 2px;
  transform: translate3d(0, -50%, 0);
  z-index: 1;
  /* visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")}; */
  &:focus {
    outline: none;
    border: none;
  }
`;

export const Select = styled.select`
  width: 100%;
  height: 30px;
  border: 0.8px solid grey;
  border-radius: 12px;
`;

export const Clear = styled.div`
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translate3d(0, -50%, 0);
  font-size: 10px;
`;
