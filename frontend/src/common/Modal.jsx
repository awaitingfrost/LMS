import React from 'react'
import {
  ModalDescription,
  ModalContent,
  Header,
  Modal,
} from 'semantic-ui-react'

const Modals = ({ open, close, title, children, setOpen }) => {
  return (
    <div className=''>
      <Modal
        onClose={close}
        open={open}
      >
        <ModalContent >
          <ModalDescription>
            <Header>{title}</Header>
            <div className='my-4'>.</div>
            <div className='my-4 modal-scrollable-content'>
              {children}
            </div>
          </ModalDescription>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Modals