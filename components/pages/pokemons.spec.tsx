/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'
import { PokemonListItem } from './pokemons'
import { PokemonListItem as Data } from '../../api/pokemons'
import { createRect } from '../../utils/image'

describe('PokemonListItems', () => {
  const data: Data = {
    name : 'PokemonName',
    id   : 1,
    image: createRect(160),
  }

  it('Can render properly', async () => {
    const { getByText, getByTestId } = render(<PokemonListItem data={data} />)
    const image                      = getByTestId('image')

    expect(getByText(`#000${data.id}`)).toBeVisible()
    expect(getByText(data.name)).toBeVisible()

    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', data.image)
  })
})
