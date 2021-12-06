/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'
import { Badge } from './badge'

describe('Badge', () => {
  it('Can render properly', () => {
    const { getByTestId } = render(<Badge>ini badge</Badge>)
    const badge           = getByTestId('badge')

    expect(badge).toBeInTheDocument()
    expect(badge.textContent).toBe('ini badge')
  })
})
