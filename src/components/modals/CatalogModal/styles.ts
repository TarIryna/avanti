import styled from "@emotion/styled";
import { media } from "@/styles/mediaBrakepoints";
import { styles } from "@/data";

export const Grid = styled.div`
  padding: 0 6px 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`

export const Container = styled.div``

export const Text = styled.div``

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 2480px;
  height: 3508px;
  background: rgb(229, 229, 229);
`;