import { SelectControl } from '@/components/ui/Select/Select';
import { InputControl } from '@/components/ui/Input/Input';
import styled from "@emotion/styled";
import { Input } from "../ui";
import { media } from "@/styles/mediaBrakepoints";

export const Form = styled.form`
  width: 500px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  ${media.mobile}{
    width: 100%;
  }

  @media screen and (max-width: 767px) {
    width: 100%; max-width: 100%; min-width: 0; > button[type="submit"] { min-height: 44px; }
  }
`;

export const PaymentMethods = styled.fieldset`
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;

  legend {
    margin-bottom: 8px;
    font-weight: 700;
  }
`;

export const PaymentOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 185px), 1fr));
  gap: 8px;
`;

export const PaymentOption = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 8px 12px;
  border: 1px solid #777;
  border-radius: 12px;
  cursor: pointer;

  input {
    flex-shrink: 0;
    margin: 0;
    accent-color: #222;
  }

  &:has(input:checked) {
    border-color: #222;
    background: #f0f0f0;
    box-shadow: inset 0 0 0 1px #222;
  }

  &:focus-within {
    outline: 2px solid #222;
    outline-offset: 2px;
  }
`;

export const CustomInput = styled(InputControl)`
  width: 100%;
  display: block;
  height: 30px;
  border: 0.8px solid grey;
  border-radius: 12px;
  padding: 0 16px;
  &:focus {
    border: 0.8px solid grey;
  }
`;

export const Select = styled(SelectControl)`
  width: 100%;
  height: 30px;
  border: 0.8px solid grey;
  border-radius: 12px;
  background: white;
`;

export const ViberInput = styled(Input)`
  width: 20px;
  height: 20px;
`;

export const ViberWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const RegistrationButton = styled.button`
  cursor: pointer;
  width: 400px;
  height: 44px;
  border-radius: 14px;
  color: black;
  font-weight: 800;
  ${media.mobile}{
    width: 100%;
    font-size: 14px;
  }

  @media screen and (max-width: 767px) {
    height: auto; min-height: 44px; padding: 8px 12px;
  }
`

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const DeliveryCartWrapper = styled.div`
  max-width: 100%;

  @media screen and (max-width: 767px) {
    width: 100%; min-width: 0;
  }
`
export const CartListProducts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`

export const Text = styled.div`
  font-size: 14px;
`

export const Message = styled.div`
  font-size: 18px;
`
