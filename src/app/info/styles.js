import styled from "@emotion/styled";

export const PageWrapper = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ContentPart = styled.div`
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 800;
  text-align: center;
`;

export const Subtitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const SubtitleSecond = styled.h2`
  font-size: 16spx;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const Text = styled.p`
  font-size: 14px;
  font-weight: 400;

  ul {
    list-style: disc inside;
    margin-bottom: 16px;
  }
`;
