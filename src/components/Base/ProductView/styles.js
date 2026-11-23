import styled from "@emotion/styled";

export const Form = styled.form`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 10px;

  @media screen and (max-width: 767px) {
    grid-template-columns: minmax(0, 1fr); min-width: 0; > * { min-width: 0; }
  }
`

export const Wrapper = styled.div`
 display: grid;
 grid-template-columns: 1fr 350px;
 gap: 10px;
 margin-bottom: 10px;

  @media screen and (max-width: 767px) {
    grid-template-columns: minmax(0, 1fr); min-width: 0; > * { min-width: 0; }
  }
`

export const List = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);

  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px;
  }
`

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 10px;

  @media screen and (max-width: 767px) {
    grid-template-columns: minmax(0, 1fr); min-width: 0; > * { min-width: 0; }
  }
`