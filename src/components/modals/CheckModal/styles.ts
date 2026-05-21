import styled from "@emotion/styled";
import { media } from "@/styles/mediaBrakepoints";

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  input {
    background: white;
    max-width: 100%;
  }
`;

export const Title = styled.p`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

export const Text = styled.div`
  font-size: 16px;
  font-weight: 500;
`

export const Total = styled.div`
  font-size: 20px;
  font-weight: 600;
`

export const PrintContainer = styled.div`
    width: 100%;
    background: white;
    min-width: 300px;
    padding: 0 20px 20px;
    `

export const TextCheck = styled.div`
  font-size: 12px;
  font-weight: 600;
`

export const Links = styled.div`
  font-size: 10px;
  font-weight: 400;
`

export const Devider = styled.div`
  margin: 5px 0;
`

export const CheckTitle = styled.div`
  font-size: 14px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 12px;
`