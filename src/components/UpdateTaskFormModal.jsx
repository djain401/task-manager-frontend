import React from "react";
import { Button, Modal, Container } from "react-bootstrap";
import UpdateForm from "./UpdateForm";

const UpdateTaskFormModal = ({
  showUpdateModalStatus,
  handleCloseUpdate,
  index,
  chosenTask,
  updateTask,
}) => {
  return (
    <>
      <Modal show={showUpdateModalStatus} onHide={handleCloseUpdate}>
        <Modal.Header>
          <Modal.Title>Update Form</Modal.Title>
        </Modal.Header>
        <Container>
          <UpdateForm
            chosenTask={chosenTask}
            index={index}
            updateTask={updateTask}
          />
        </Container>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdate}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateTaskFormModal;
