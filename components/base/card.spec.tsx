/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'
import { Card } from './card'

describe('Card', () => {
  it('Can render properly', async () => {
    const { getByTestId } = render(<Card>ini card</Card>)
    const card            = getByTestId('card')

    expect(card).toBeInTheDocument()
    expect(card).toHaveTextContent('ini card')
  })
})
