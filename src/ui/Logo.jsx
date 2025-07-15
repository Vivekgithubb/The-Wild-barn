import styled from "styled-components";
import { useDarkMode } from "../Context/useDarkMode";

const StyledLogo = styled.div`
  text-align: center;
  padding: 1rem;
  background: none; // ✅ No background color
  border-radius: 0;
`;

const Img = styled.img`
  height: 15.6rem;
  width: 9.6rem;
  object-fit: cover;
  background-color: transparent;
  border-radius: 50%; // Perfect circle crop
`;

function Logo() {
  const { darkMode } = useDarkMode();

  return (
    <StyledLogo>
      {darkMode ? (
        <Img src="/Wild-Barn-dark-trans.png" alt="Logo" />
      ) : (
        <Img src="/Wild-Barn-light-trans.png" alt="Logo" />
      )}
    </StyledLogo>
  );
}

export default Logo;
