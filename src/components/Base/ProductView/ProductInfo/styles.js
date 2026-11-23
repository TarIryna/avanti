import styled from "@emotion/styled";

export const Grid = styled.div`
    display: grid;
    grid-template-columns: 110px 1fr;
    gap: 4px;
    font-size: 12px;
    border: 1px solid grey;
    border-radius: 12px;
    padding: 10px;

  @media screen and (max-width: 767px) {
    grid-template-columns: minmax(0, 1fr); overflow-wrap: anywhere;
  }
`