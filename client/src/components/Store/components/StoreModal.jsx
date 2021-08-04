import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteProductAction } from "../../../redux/store/store-action";
import { useSelector, useDispatch } from "react-redux";
const StoreModal = (props) => {
  //state
  const [doneDeleteAction, setDoneDeleteAction] = useState(false);
  //redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { status } = useSelector((state) => state.message);

  const deleteHandler = () => {
    dispatch(deleteProductAction(props.selectedId, user.token));
    setDoneDeleteAction(true);
    props.showModalHandler(false);
  };
  const closeModalHandler = () => {
    props.showModalHandler(false);
  };
  useEffect(() => {
    if (doneDeleteAction && status !== 200) {
      props.showError(true);
    }
    setDoneDeleteAction(false);
  }, [doneDeleteAction, props, status]);
  return (
    <Modal backdrop="static" keyboard={false} show={props.showModal}>
      <Modal.Header closeButton onClick={closeModalHandler}>
        <Modal.Title>Delete Product</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to delete this product?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={closeModalHandler}>
          Close
        </Button>
        <Button variant="danger" onClick={deleteHandler}>
          Delete Product
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StoreModal;
