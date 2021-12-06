import { useLazyQuery, gql } from '@apollo/client'
import { useEffect, useMemo } from 'react'

export const GET_POKEMON_DETAIL = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      status
      message
      id
      name
      weight
      height
      abilities {
        ability {
          name
        }
      }
      stats {
        stat {
          name
        }
        base_stat
      }
      types {
        type {
          name
        }
      }
      sprites {
        front_default
        back_default
      }
    }
  }
`

export interface Ability {
  ability: {
    name: string;
  }
}

export interface Sprites {
  front_default: string;
  back_default: string;
}

export interface Stat {
  stat: {
    name: string;
  }
  base_stat: number;
}

export interface Type {
  type: {
    name: string;
  }
}

export interface PokemonDetail {
  status: boolean;
  message: string;
  id: number;
  name: string;
  weight: number;
  height: number;
  abilities: Ability[];
  stats: Stat[];
  types: Type[];
  sprites: Sprites;
}

export interface PokemonDetailResponse {
  pokemon: PokemonDetail;
}

export interface POkemonDetailRequest {
  name: string;
}

export function usePokemonDetail (name?: string) {
  const [fetch, { loading, data, error }] = useLazyQuery<PokemonDetailResponse, POkemonDetailRequest>(GET_POKEMON_DETAIL)

  const detail = useMemo(() => {
    return data?.pokemon
  }, [data])

  function load (name: string) {
    fetch({ variables: { name } })
  }

  useEffect(() => {
    if (name)
      fetch({ variables: { name } })
  }, [fetch, name])

  return {
    detail,
    load,
    loading,
    error,
  }
}
