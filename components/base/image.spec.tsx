/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'
import { createRect } from '../../utils/image'
import { ImagePixelated } from './image'

describe('ImagePixelated', () => {
  it('Can render properly', async () => {
    const srcImage        = createRect(160)
    const { getByTestId } = render(<ImagePixelated src={srcImage} />)
    const image           = getByTestId('image')

    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', srcImage)
  })

  it('Shoulbe grayscale if props colored not set true', async () => {
    const srcImage        = createRect(160)
    const { getByTestId } = render(<ImagePixelated src={srcImage} />)
    const image           = getByTestId('image')

    expect(image).toBeInTheDocument()
    expect(image).toHaveClass('saturate-0', 'contrast-200', 'opacity-60')
  })

  it('Shoul be not grayscale if props colored set true', async () => {
    const srcImage        = createRect(160)
    const { getByTestId } = render(<ImagePixelated src={srcImage} colored />)
    const image           = getByTestId('image')

    expect(image).toBeInTheDocument()
    expect(image).not.toHaveClass('saturate-0', 'contrast-200', 'opacity-60')
  })
})
