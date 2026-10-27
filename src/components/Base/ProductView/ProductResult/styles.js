import styled from "@emotion/styled";


export const Wrapper = styled.div`
    border: 1px solid grey;
    border-radius: 12px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;
    overflow-x: auto;
`

export const Title = styled.div`
    text-align: left;
    font-size: 14px;
    font-weight: 600;
`

export const ProductHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
`;

export const ProductImage = styled.div`
    position: relative;
    flex: 0 0 90px;
    width: 90px;
    height: 90px;

    img {
      object-fit: contain;
    }
`;
export const Table = styled.table`
    font-size: 14px;
    text-align: center;
    font-weight: 600;
    border-collapse: collapse;
    min-width: 760px;
    width: 100%;

    th, td {
        padding: 8px 10px;
        border: 1px solid #ddd;
    } 
`
