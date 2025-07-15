import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
// import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabins from "./useDeleteCAbins";
import { TfiClipboard, TfiMarkerAlt, TfiTrash } from "react-icons/tfi";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

// const Img = styled.img`
//   display: block;
//   width: 6.4rem;
//   aspect-ratio: 3 / 2;
//   object-fit: cover;
//   object-position: center;
//   transform: scale(1.5) translateX(-7px);
//   margin-left: 10px;
//   border-radius: 3px;
// `;
const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  margin-left: 10px;
  border-radius: 3px;
  transition: all 0.3s ease-in-out;
  position: relative;
  z-index: 1;
  cursor: pointer;

  /* &:hover::after {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    z-index: 998;
  }

  &:hover {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 80vw;
    height: auto;
    transform: translate(-50%, -50%);
    z-index: 999;
    border-radius: 10px;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
    transition: 0.5s ease-in-out;
  } */
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

// const Button = styled.button`
//   background-color: #1f68e7;
//   color: #ffffff;
//   border: 0px;
//   border-radius: 40px;
//   padding: 4px;
//   padding-left: 11px;
//   padding-right: 11px;
//   &:hover {
//     background-color: #000000;
//     transition: 0ms.5 ease-in-out;
//   }
//   margin: 2px;
// `;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
`;
function CabinRow({ cabin }) {
  // const [showForm, setshowForm] = useState(false);
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    // description,
  } = cabin;

  const { isDeleteing, deleteCabin } = useDeleteCabins();
  const { isAdding, createCabin } = useCreateCabin();
  function handleDup() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
    });
  }
  return (
    <Table.Row role="row">
      <Img src={image}></Img>
      <Cabin>{name}</Cabin>
      <div>Fits upto {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}

      <Div>
        {/* <Button onClick={handleDup} disabled={isAdding}>
          <TfiClipboard />
        </Button> */}
        <Modal>
          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="cabin"
              disabled={isDeleteing}
              onConfirm={() => deleteCabin(cabinId)}
            />
          </Modal.Window>

          <Menus.Menu>
            <Menus.Toggle id={cabinId} />

            <Menus.List id={cabinId} disabled={isAdding}>
              <Menus.Button icon={<TfiClipboard />} onClick={handleDup}>
                Duplicate
              </Menus.Button>

              <Modal.Open open="edit">
                <Menus.Button icon={<TfiMarkerAlt />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open open="delete">
                <Menus.Button icon={<TfiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>
        </Modal>
      </Div>
    </Table.Row>
  );
}

export default CabinRow;
