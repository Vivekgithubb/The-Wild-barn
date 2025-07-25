import styled from "styled-components";
import Heading from "../ui/Header";
import GlobalStyle from "../styles/GlobalStyle";
import Button from "./Button";
// import { useNavigate } from "react-router-dom";

const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sono";
    margin-bottom: 3.2rem;
    color: var(--color-grey-500);
  }
`;
function ErrorFallback({ resetErrorBoundary }) {
  // const navigate = useNavigate();
  return (
    <>
      <GlobalStyle />
      <StyledErrorFallback>
        <Box>
          <Heading as="h1">Something went Wrong....🥲</Heading>
          <Button onClick={resetErrorBoundary} type="medium" variation="danger">
            Go Back
          </Button>
          {/* <p>{error.message}</p> */}
        </Box>
      </StyledErrorFallback>
    </>
  );
}

export default ErrorFallback;
