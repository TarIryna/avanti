import styled from "@emotion/styled";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 12px;
    padding: 10px;
`
export const ProductWrapper = styled.div`
    display: flex;
    gap: 6px;
    align-items: center;
`
export const ImageWrapper = styled.div`
    height: 200px;
    width: 250px;
    position: relative;

    img {
        object-fit: contain;
        object-position: left center;
    }
`