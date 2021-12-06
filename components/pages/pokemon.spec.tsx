/**
 * @jest-environment jsdom
 */

import { render, fireEvent } from '@testing-library/react'
import { PokemonDetail, PokemonDetailLoading } from './pokemon'
import { createRect } from '../../utils/image'
import { PokemonDetail as Detail } from '../../api/pokemon'

describe('PokemonDetail', () => {
  const imageA = createRect(320, '#ffffff')
  const imageB = createRect(320, '#000000')

  const data: Detail = {
    status   : false,
    message  : '',
    id       : 1,
    name     : 'PokemonName',
    weight   : 88888,
    height   : 99999,
    abilities: [{ ability: { name: 'AbilityA' } }, { ability: { name: 'AbilityB' } }],
    stats    : [
      {
        stat     : { name: 'StatA' },
        base_stat: 10,
      },
      {
        stat     : { name: 'StatB' },
        base_stat: 20,
      },
      {
        stat     : { name: 'StatC' },
        base_stat: 30,
      },
    ],
    types  : [{ type: { name: 'TypeA' } }, { type: { name: 'TypeB' } }],
    sprites: {
      front_default: imageA,
      back_default : imageB,
    },
  }

  it('Should be render properly', async () => {
    const { getByText, getByTestId } = render(<PokemonDetail detail={data} />)
    const image                      = getByTestId('image')

    expect(getByText(`#000${data.id}`)).toBeVisible()
    expect(getByText(data.name)).toBeVisible()
    expect(getByText(data.weight)).toBeVisible()
    expect(getByText(data.height)).toBeVisible()
    expect(getByText(data.abilities[0].ability.name)).toBeVisible()
    expect(getByText(data.abilities[1].ability.name)).toBeVisible()
    expect(getByText(data.stats[0].stat.name)).toBeVisible()
    expect(getByText(data.stats[1].stat.name)).toBeVisible()

    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', imageA)
  })

  it('Should be changed image after image clicked (click to rotate)', async () => {
    const { getByTestId } = render(<PokemonDetail detail={data} />)
    const image           = getByTestId('image')

    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', imageA)

    fireEvent.click(image)

    expect(image).toHaveAttribute('src', imageB)

    fireEvent.click(image)

    expect(image).toHaveAttribute('src', imageA)
  })

  it('Should be have colored image if pokemon already owned (owned > 0)', () => {
    const { getByTestId } = render(<PokemonDetail detail={data} owned={1} />)
    const image           = getByTestId('image')

    expect(image).toBeInTheDocument()
    expect(image).not.toHaveClass('saturate-0', 'contrast-200', 'opacity-60')
  })
})

describe('PokemonDetailLoading', () => {
  it('Should be render properly and has loading class', () => {
    const { getByTestId } = render(<PokemonDetailLoading />)
    const item            = getByTestId('pokemon-detail')

    expect(item).toBeInTheDocument()
    expect(item).toHaveClass('font-loading', 'animate-pulse')
  })
})
