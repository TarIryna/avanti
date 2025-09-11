import { Container } from "./styles";

const PageContainer = ({ children }) => {
  return <Container className="page">{children}</Container>;
};

export default PageContainer;
