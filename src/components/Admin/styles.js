import { InputControl } from '@/components/ui/Input/Input';
import styled from "@emotion/styled";
import { statusColors } from "../Profile/Orders/components/styles";

export const Title = styled.h4`
    text-align: center;
    font-size: 20px;
    font-weight: 700;
`

export const CartWrapper = styled.div`
    margin: 20px 0;
    padding: 10px 20px;
    border-bottom: 1px solid grey;
    border-top: 1px solid grey;

  @media screen and (max-width: 767px) {
    padding: 10px 0; min-width: 0;
  }
`

export const Subtitle = styled.div`
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    position: relative;
    width: fit-content;
    margin: 0 auto;
    max-width: calc(100% - 100px);

  @media screen and (max-width: 767px) {
    max-width: 100%; overflow-wrap: anywhere;
  }
`

export const BlockTitle = styled.div`
    font-size: 14px;
    font-weight: 500;
`

export const Payment = styled.div`
    font-size: 14px;
    font-weight: 500;
    border: 1px solid grey;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    width: fit-content;
`

export const Text = styled.div`
    font-size: 14px;
    font-weight: 400;
`
export const ViberLink = styled.a`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    margin-left: 4px;
    vertical-align: middle;
    color: #7360f2;
`
export const Status = styled.div`
    padding: 2px 10px;
    ${({ status }) => status && `background: ${statusColors[status]}`};
    min-width: max-content;
    position: absolute;
    left: calc(100% + 6px);
    top: 50%;
    transform: translate3d(0, -50%, 0);
    display: flex;
    align-items: center;
    border-radius: 10px;

  @media screen and (max-width: 767px) {
    position: static; transform: none; margin-top: 6px; width: fit-content; min-width: 0;
  }
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 200px;
    padding: 20px 0;

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`

export const Button = styled.button`
    width: 100%;
    border: 0.5px solid grey;
    border-radius: 10px;
`

export const DeliveryText = styled.span`
    font-size: 14px;
`

export const DeliveryData = styled.div`
    display: flex;
    gap: 10px;
    button {
        margin-top: 10px;
    }

  @media screen and (max-width: 767px) {
    flex-wrap: wrap; > * { min-width: 0; max-width: 100%; }
  }
`

export const Flex = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;

    button {
        width: 200px;
    }

  @media screen and (max-width: 767px) {
    flex-wrap: wrap; > * { min-width: 0; max-width: 100%; }
  }
`

export const Input = styled(InputControl)`
        width: 300px;
        border-radius: 16px;
        border: 0.5px solid grey;
        padding: 0 10px;

  @media screen and (max-width: 767px) {
    width: 100%; min-width: 0; min-height: 40px;
  }
`
