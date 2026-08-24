import styled from "@emotion/styled";

export const List = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
`

export const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    `
export const Flex = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    div {
    max-width: 400px;
    }
`

export const ImageWrapper = styled.div`
    width: 400px;
    height: 400px;
    position: relative;

    img {
    max-width: 100%;
    max-height: 100%;
    object-position: center;
    object-fit: contain;
  }
`
