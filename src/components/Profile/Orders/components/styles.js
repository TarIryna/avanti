import styled from "@emotion/styled";

export const statusColors = {
    new: '#56d956',
    delivered: 'orange',
    completed: 'blue'
}

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 12px;
    padding: 10px;
    border-bottom: 1px solid grey;
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

export const Status = styled.p`
display: flex;
gap: 6px;
align-items: center;
span {
    padding: 2px 10px;
    width: fit-content;
    border-radius: 14px;
    ${({ status }) => status && `background: ${statusColors[status]}`};
    display: flex;
    align-items: center;
}
`