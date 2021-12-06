/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'
import { ProgressBar, Bar } from './progress-bar'

describe('ProgressBar', () => {
  it('Can render properly', async () => {
    const {
      getByTestId,
      getAllByTestId,
    } = render(<ProgressBar value={10} step={10} />)

    const progressBar = getByTestId('progress-bar')
    const bars        = getAllByTestId('bar')

    expect(progressBar).toBeInTheDocument()
    expect(bars.length).toBe(10)
  })

  it('active bar must be determine value', async () => {
    const {
      getByTestId,
      getAllByTestId,
    } = render(<ProgressBar value={30} step={10} maxValue={100} />)

    const progressBar = getByTestId('progress-bar')
    const bars        = getAllByTestId('bar')
    const activeBars  = progressBar.querySelectorAll('[data-active="true"')

    expect(progressBar).toBeInTheDocument()
    expect(bars.length).toBe(10)
    expect(activeBars.length).toBe(3)
  })
})

describe('Bar', () => {
  it('should be active if prop active true', () => {
    const { getByTestId } = render(<Bar active={true} />)
    const bar             = getByTestId('bar')

    expect(bar).toBeInTheDocument()
    expect(bar).toHaveClass('bg-retro-800')
    expect(bar).not.toHaveClass('bg-retro-600')
  })

  it('should be deactive if prop active false', () => {
    const { getByTestId } = render(<Bar active={false} />)
    const bar             = getByTestId('bar')

    expect(bar).toBeInTheDocument()
    expect(bar).not.toHaveClass('bg-retro-800')
    expect(bar).toHaveClass('bg-retro-600')
  })
})
