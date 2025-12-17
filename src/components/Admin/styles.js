import styled from "@emotion/styled";
import { statusColors } from "../Profile/Orders/components/styles";

export const Title = styled.h4`
    text-align: center;
    font-size: 20px;
    font-weight: 700;
`

export const CartWrapper = styled.div`
    margin: 20px 0;
    padding: 20px;
    border-bottom: 1px solid grey;
    border-top: 1px solid grey;
`

export const Subtitle = styled.div`
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    position: relative;
    width: fit-content;
    margin: 0 auto;
`

export const BlockTitle = styled.div`
    font-size: 14px;
    font-weight: 500;
`

export const Text = styled.div`
    font-size: 14px;
    font-weight: 400;
`
export const Status = styled.div`
    padding: 2px 10px;
    ${({ status }) => status && `background: ${statusColors[status]}`};
    width: fit-content;
    position: absolute;
    left: calc(100% + 6px);
    top: 50%;
    transform: translate3d(0, -50%, 0);
    display: flex;
    align-items: center;
    border-radius: 10px;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 200px;
    padding: 20px 0;
`

export const Input = styled.input`
    border: 0.5px solid grey;
    border-radius: 10px;
    padding: 0 10px;
`

export const Button = styled.button`
    width: 100%;
    border: 0.5px solid grey;
    border-radius: 10px;
`