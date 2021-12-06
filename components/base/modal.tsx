import { FC } from 'react'
import { Card } from './card'

interface ModalProps {
  className?: string;
  modalBodyClass?: string;
  onClose?: Function;
}

export const Modal: FC<ModalProps> = (properties) => {
  function emitClose () {
    if (typeof properties.onClose === 'function')
      properties.onClose()
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center w-screen h-screen p-5">
      <div
        data-id="modal-body"
        className="z-50 w-full h-auto max-w-screen-sm">
        <Card className="p-4 bg-retro">
          {properties.children}
        </Card>
      </div>
      <div
        data-id="backdrop"
        className="absolute z-40 w-screen h-screen bg-opacity-50 bg-retro-900"
        onClick={emitClose} />
    </div>
  )
}
