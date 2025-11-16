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
`;

export const CustomInput = styled.input`
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

export const Select = styled.select`
  width: 100%;
  height: 30px;
  border: 0.8px solid grey;
  border-radius: 12px;
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
`

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const DeliveryCartWrapper = styled.div`
  max-width: 100%;
`