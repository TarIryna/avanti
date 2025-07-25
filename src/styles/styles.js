import styled from "@emotion/styled";

export const Dropdown = styled.div`
  display: ${(props) => (props.dropdown ? "block" : "none")};
`;
