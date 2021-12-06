/**
 * @jest-environment jsdom
 */

import { render, fireEvent } from '@testing-library/react'
import { Modal } from './modal'

describe('Modal', () => {
  it('Should be render properly', async () => {
    const { getByTestId } = render(<Modal>ini modal</Modal>)
    const modal           = getByTestId('modal')

    expect(modal).toBeInTheDocument()
    expect(modal).toHaveTextContent('ini modal')
  })

  it('Should be calling onClose when backdrop clicked', () => {
    const onClose         = jest.fn()
    const { getByTestId } = render(<Modal onClose={onClose}>ini modal</Modal>)
    const backdrop        = getByTestId('modal-backdrop')

    fireEvent.click(backdrop)

    expect(onClose).toBeCalled()
  })
})
