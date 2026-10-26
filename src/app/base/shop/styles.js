import styled from "@emotion/styled";

export const Title = styled.h1`
  margin: 0 0 20px;
  font-size: 24px;
`;

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 16px;
  margin-bottom: 24px;
`;

export const ArrivalAction = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin: -8px 0 24px;
  color: #444;
  font-size: 14px;
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 180px;
  font-size: 14px;

  input {
    min-height: 40px;
    padding: 6px 10px;
    border: 1px solid #aaa;
    border-radius: 6px;
    background: #fff;
    font: inherit;
  }
`;

export const Error = styled.p`
  color: #b00020;
`;

export const Report = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 10px;
`;

export const ReportTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 20px;
`;

export const Metrics = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
`;

export const Metric = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 8px;

  span {
    color: #555;
    font-size: 13px;
  }
`;

export const SectionTitle = styled.h3`
  margin: 22px 0 10px;
  font-size: 17px;
`;

export const TableScroll = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  th, td {
    padding: 8px;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }
`;

export const Empty = styled.p`
  color: #555;
`;
