import styled from "@emotion/styled";


export const Wrapper = styled.div`
    border: 1px solid grey;
    border-radius: 12px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

  @media screen and (max-width: 767px) {
    min-width: 0; max-width: 100%; overflow-x: auto;
  }
`

export const Title = styled.div`
    text-align: center;
    font-size: 14px;
    font-weight: 600;
`
export const Table = styled.table`
font-size: 10px;
text-align: center;

td, tr {
padding: 0 10px;
} 
`
export const Line = styled.div`
    width: 100%;
    height: 1px;
    background: grey;
    margin: 5px 0;
`