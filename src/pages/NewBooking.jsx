import styled from "styled-components";
import Heading from "../ui/Heading";
import NewBookForm from "../ui/NewBookForm";

const StyledNewBooking = styled.div`
  background-color: var(--color-grey-100);
  border-radius: 10px;
  padding-left: 10px;
  padding: 10px;
  height: 100%;
  width: 100%;
`;

function NewBooking() {
  return (
    <StyledNewBooking>
      <Heading as="h2">Book New Cabins</Heading>
      <NewBookForm />
    </StyledNewBooking>
  );
}

export default NewBooking;
