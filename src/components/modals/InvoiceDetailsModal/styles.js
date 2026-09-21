
import { media } from "@/styles/mediaBrakepoints";
import styled from "@emotion/styled";

export const Flex = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
.invoice {
  width: 100px;
  margin-top: 36px;
  background: white;
  border-radius: 14px;
}
`


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 120px);
  height: calc(100vh - 120px);
  background: rgb(229, 229, 229);
  border-radius: 16px;
  ${media.mobile} {
    height: 100dvh;
    width: 100vw;
    min-height: auto;
    border-radius: 0;
    overflow: hidden;
    overflow-y: auto;
  }
`;

export const Wrapper = styled.div`
  font-size: 14px;
  width: 100%;
  .invoice-select {
    width: 30%;
  }

`

export const Title = styled.div`
  height: 30px;
  background: white;
  padding: 5px 10px;
  width: max-content;
  border-radius: 14px;
  margin-bottom: 5px;
  width: 100px;
`

export const Text = styled(Title)`
  width: max-content;
  `

export const ImageCard = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    transform: translate3d(0, 0, 0);
  }
`;


export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const ListItemWrapper = styled.div`
  display: flex;
  align-items: end;
  height: 40px;
  gap: 10px;
`

export const ItemImageCard = styled(ImageCard)`
  width: 40px;
  height: 100%;
`
export const Content = styled.div`
  display: grid;
  fgrid-template-columns: repeat(2, 1fr);
  gap: 5px;
  padding: 0 20px;
`
export const Table = styled.table``

export const ImageInvoice = styled(ImageCard)`
  width: 40px;
  height: 40px;
`