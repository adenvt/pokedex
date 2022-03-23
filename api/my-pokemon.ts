import { useMemo, useState } from 'react'
import { useLocalStorage, useMount } from 'react-use'
import { usePagination } from '../composition/use-pagination'
import { PokemonDetail } from './pokemon'
import type { PokemonListItem } from './pokemons'

export interface MyPokemon extends PokemonListItem {
  nickname: string
}

export type MyPokemons = Record<number, MyPokemon[]>

function toPokemonListItem (data: PokemonDetail | PokemonListItem): PokemonListItem {
  if ('sprites' in data) {
    return {
      id   : data.id,
      name : data.name,
      image: data.sprites.front_default,
    }
  }

  return {
    id   : data.id,
    name : data.name,
    image: data.image,
  }
}

export function useMyPokemons (initialPage = 1, perPage = 8) {
  const [loading, setLoading] = useState(false)
  const [page, setPage]       = useState(initialPage)
  const [value, setValue]     = useLocalStorage<MyPokemons>('my-pokemon', {})

  const collections = useMemo<MyPokemon[]>(() => {
    if (!value)
      return []

    return Object.values(value).flat()
  }, [value])

  const total = useMemo(() => {
    return collections.length
  }, [collections])

  const { limit,
    offset,
    canNext,
    canPrev,
    totalPage,
  } = usePagination(page, perPage, total)

  const list = useMemo(() => {
    return collections.slice(offset, offset + limit)
  }, [
    collections,
    limit,
    offset,
  ])

  function findById (id: number): MyPokemon[] | undefined {
    return value?.[id]
  }

  function findOwnedById (id: number): number {
    return findById(id)?.length ?? 0
  }

  function addPokemon (pokemon: PokemonListItem | PokemonDetail, nickname: string) {
    const old = findById(pokemon.id)

    if (old?.some((item) => item.nickname.toLowerCase() === nickname.toLowerCase()))
      throw new Error('Nickname already taken')

    const form: MyPokemon = {
      ...toPokemonListItem(pokemon),
      nickname,
    }

    setValue({
      ...value,
      [pokemon.id]: old ? [...old, form] : [form],
    })
  }

  function nextPage () {
    setPage((value) => value + 1)
  }

  function previousPage () {
    setPage((value) => value - 1)
  }

  function removePokemon (pokemon: MyPokemon, nickname: string) {
    const old = findById(pokemon.id)

    if (!old)
      return

    setValue({
      ...value,
      [pokemon.id]: old.filter((item) => item.nickname !== nickname),
    })
  }

  useMount(() => {
    setLoading(false)
  })

  return {
    loading,
    list,
    findById,
    findOwnedById,
    addPokemon,
    removePokemon,
    page,
    canNext,
    canPrev,
    totalPage,
    nextPage,
    prevPage: previousPage,
  }
}
