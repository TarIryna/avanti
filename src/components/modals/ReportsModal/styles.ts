import styled from "@emotion/styled";


export const Container = styled.div``

export const SummarySection = styled.section`
  min-width: 0;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  h3 { margin-bottom: 8px; font-weight: 600; }
`;

export const SummaryList = styled.ul`
  display: grid;
  gap: 8px;
  li { display: flex; justify-content: space-between; align-items: start; gap: 12px; }
  li > :last-child { flex-shrink: 0; }
`;

export const ExpenseDetail = styled.div`
  margin-top: 3px;
  font-size: 12px;
  color: #555;
  overflow-wrap: anywhere;
`;

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
