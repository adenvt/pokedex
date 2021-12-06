/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'
import { PokemonListItem, PokemonListItemsLoading } from './pokemons'
import { PokemonListItem as Data } from '../../api/pokemons'
import { createRect } from '../../utils/image'

describe('PokemonListItem', () => {
  const data: Data = {
    name : 'PokemonName',
    id   : 1,
    image: createRect(160),
  }

  it('Should be render properly', async () => {
    const { getByText, getByTestId } = render(<PokemonListItem data={data} />)
    const image                      = getByTestId('image')

    expect(getByText(`#000${data.id}`)).toBeVisible()
    expect(getByText(data.name)).toBeVisible()
    expect(getByText('owned: 0')).toBeVisible()

    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', data.image)
  })

  it('Should be have colored image if pokemon already owned (owned > 0)', () => {
    const { getByTestId } = render(<PokemonListItem data={data} owned={1} />)
    const image           = getByTestId('image')

    expect(image).toBeInTheDocument()
    expect(image).not.toHaveClass('saturate-0', 'contrast-200', 'opacity-60')
  })

  it('Should be shown nickname instead of owned count, if nickname provided', () => {
    const { queryByText } = render(<PokemonListItem data={data} nickname="Tarjono" />)

    expect(queryByText('Tarjono')).toBeVisible()
    expect(queryByText('owned :')).toBe(null)
  })

  it('Should be have colored image if nickname provided', () => {
    const { getByTestId } = render(<PokemonListItem data={data} nickname="Tarjono" />)
    const image           = getByTestId('image')

    expect(image).toBeInTheDocument()
    expect(image).not.toHaveClass('saturate-0', 'contrast-200', 'opacity-60')
  })
})

describe('PokemonListItemsLoading', () => {
  it('Should be render properly and has loading class', () => {
    const { getByTestId } = render(<PokemonListItemsLoading />)
    const item            = getByTestId('pokemon-list-item')

    expect(item).toBeInTheDocument()
    expect(item).toHaveClass('font-loading', 'animate-pulse')
  })
})
