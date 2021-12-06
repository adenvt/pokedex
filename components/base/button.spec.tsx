/**
 * @jest-environment jsdom
 */

import { render, fireEvent } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  it('Can render properly', () => {
    const { getByTestId } = render(<Button>ini button</Button>)
    const button          = getByTestId('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('ini button')
  })

  it('Can handle onClick', () => {
    const onClick         = jest.fn()
    const { getByTestId } = render(<Button onClick={onClick}>ini button</Button>)
    const button          = getByTestId('button')

    fireEvent.click(button)

    expect(onClick).toBeCalled()
  })

  it('has attribute disabled if set true', () => {
    const { getByTestId } = render(<Button disabled>ini button</Button>)
    const button          = getByTestId('button')

    expect(button).toBeDisabled()
  })
})
