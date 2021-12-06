import { useLazyQuery, gql } from '@apollo/client'
import { useEffect, useMemo, useState } from 'react'
import { usePagination } from '../composition/use-pagination'

const GET_POKEMONS_LIST = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      status
      message
      count
      results {
        id
        name
        image
      }
    }
  }
`

export interface PokemonListItem {
  id: number;
  name: string;
  image: string;
}

export interface PokemonList {
  status: boolean;
  message: string;
  count: number;
  results: PokemonListItem[];
}

export interface PokemonListResponse {
  pokemons: PokemonList;
}

export interface PokemonListRequest {
  limit: number;
  offset: number;
}

export function usePokemonList (initialPage = 1, perPage = 8) {
  const [page, setPage]                   = useState(initialPage)
  const [fetch, { loading, data, error }] = useLazyQuery<PokemonListResponse, PokemonListRequest>(GET_POKEMONS_LIST)

  const total = useMemo(() => {
    return data?.pokemons.count ?? 0
  }, [data])

  const list = useMemo(() => {
    return data?.pokemons.results ?? []
  }, [data])

  const {
    limit,
    offset,
    canNext,
    canPrev,
    totalPage,
  } = usePagination(page, perPage, total)

  function load () {
    fetch({ variables: { limit: limit, offset: offset } })
  }

  function nextPage () {
    setPage((value) => value + 1)
  }

  function previousPage () {
    setPage((value) => value - 1)
  }

  useEffect(() => {
    fetch({ variables: { limit, offset } })
  }, [limit, offset, fetch ])

  return {
    load,
    loading,
    list,
    data,
    error,
    page,
    totalPage,
    nextPage,
    prevPage: previousPage,
    canPrev,
    canNext,
  }
}
