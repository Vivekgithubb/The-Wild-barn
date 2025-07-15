import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import { HiEllipsisVertical } from "react-icons/hi2";
import { createPortal } from "react-dom";
import useOutsideClick from "../hooks/useOutsideClick";

// const StyledMenu = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
// `;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  /* color: white; */
  background-color: var(--color-grey-0);
  opacity: 50;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 1.6rem;
  z-index: 100;
  &:hover {
    background-color: var(--color-grey-200);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;
const menusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");

  const [position, setposition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;
  return (
    <menusContext.Provider
      value={{ open, openId, close, position, setposition }}
    >
      {children}
    </menusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, close, open, setposition } = useContext(menusContext);
  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setposition({
      // x: window.innerHeight - rect.width - rect.x,
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function List({ id, children }) {
  const { close, openId, position } = useContext(menusContext);

  const ref = useOutsideClick(close, false);

  if (openId !== id) return;
  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(menusContext);
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menus;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
