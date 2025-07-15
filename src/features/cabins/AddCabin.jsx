// import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
// import CabinTable from "./CabinTable";

// function AddCabin() {
//   const [showModal, setshowModal] = useState(false);
//   return (
//     <>
//       <Button onClick={() => setshowModal((show) => !show)}>
//         {showModal ? "Close Form" : "Add New Cabin"}
//       </Button>
//       {showModal && (
//         <Modal onClose={() => setshowModal(false)}>
//           <CreateCabinForm onCloseModal={() => setshowModal(false)} />
//         </Modal>
//       )}
//     </>
//   );
// }

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open open="cabin-form">
          <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
        {/* <Modal.Open open="table">
        <Button>Show Cabin Table</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window> */}
      </Modal>
    </div>
  );
}

export default AddCabin;
