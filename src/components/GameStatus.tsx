import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

type GameStatusProps ={
    status:string
}

const GameStatus = ({status}: GameStatusProps) => {
    const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
      <Modal show={show} onHide={handleClose} centered={true} dialogClassName='modal-dialog'>
        <Modal.Header className='bg-secondary' closeButton >
          {status}
        </Modal.Header>
        <Modal.Body className='bg-secondary'>Refresh or hit "Enter" to have another go!</Modal.Body>
      </Modal>
     );
}
 
export default GameStatus;