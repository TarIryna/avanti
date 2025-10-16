import styled from "@emotion/styled";
import { Input } from "../ui";

export const Form = styled.form`
  width: 500px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 16px;
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
