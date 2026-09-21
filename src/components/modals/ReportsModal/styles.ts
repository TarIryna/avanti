import styled from "@emotion/styled";


export const Container = styled.div``

export const Text = styled.div`
  font-size: 10px;
`

export const TitleText = styled.div`
  // font-size: 16px;
  // font-weight: 600;
`

export const RightBlock = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  gap: 6px;
  font-size: 20px;
  font-weight: 600;
`

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: white;
`;

export const TitleBlock = styled.div`
  margin-top: 30px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`

export const Date = styled.div`
  display: flex;
  align-items: center;
  font-size: 30px;
  font-weight: 600;
  margin-left: 50px;
`
export const Operations = styled.div`

  `

export const Table = styled.table`
      font-size: 12px;
      width: 100%;
  
      th, td {
      padding: 0 5px;
      text-align: center;
      }
      .cursor {
      cursor: pointer;
      }
  `
  export const Title = styled.div`
      text-align: center;
      font-size: 14px;
      font-weight: 600;
  `