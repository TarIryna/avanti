import styled from "@emotion/styled";

export const Wrapper = styled.div`
  position: relative;
  height: 40px;
`;

export const Input = styled.input`
  width: 90%;
  display: block;
  height: calc(100% - 2px);
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
  height: inherit;
  border: 0.8px solid grey;
  border-radius: 12px;
  background: white;
  padding: 0 10px 0;
`;

export const Clear = styled.div`
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translate3d(0, -50%, 0);
  font-size: 10px;
`;

export const Title = styled.div`
  position: absolute;
  top: 0;
  left: 18px;
  font-size: 8px;
  z-index: 2;
  `