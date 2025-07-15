import styled from "styled-components";
import BlurText from "../ui/BlurText";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDarkMode } from "../Context/useDarkMode";

const Main = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: var(--color-grey-100);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const H1 = styled.span`
  font-size: 50px;
`;
// const H2 = styled.span`
//   font-size: 40px;
//   margin-bottom: 30px;
// `;

const Img = styled.img`
  /* border-radius: 1000px; */
  text-align: center;
  height: 250px;
  object-fit: cover;
`;

const Div = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* gap: 20px; */
`;

function Landing() {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/Dashboard");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <Main>
      <Div>
        <H1>
          <BlurText
            text="Welcome to"
            delay={50}
            animateBy="letters"
            direction="top"
            className="text-2xl mb-8"
          />
        </H1>

        <Img
          src={
            darkMode
              ? "/Wild-Barn-dark-trans.png"
              : "/Wild-Barn-light-trans.png"
          }
        />
        <H1>
          <BlurText
            text="Wild Barn"
            delay={150}
            animateBy="letters"
            direction="top"
            className="text-2xl mb-8"
          />
        </H1>
      </Div>
    </Main>
  );
}

export default Landing;
