import { NextPage } from 'next'
import Link from 'next/link'
import { useMount } from 'react-use'
import { useMyPokemons } from '../api/my-pokemon'
import { usePokemonList } from '../api/pokemons'
import { Button } from '../components/base/button'
import { PokemonListItem, PokemonListItemsLoading } from '../components/pages/pokemons'
import classNames from 'classnames'
import { FilterNavbar } from '../components/layout/navbar'

const PokemonList: NextPage = () => {
  const { loading,
    load,
    list,
    page,
    totalPage,
    canPrev,
    canNext,
    prevPage,
    nextPage } = usePokemonList()

  const { findOwnedById } = useMyPokemons()

  useMount(() => {
    load()
  })

  return (
    <>
      <div className="flex items-center justify-between py-3">
        <h2 className="text-lg">
          Pokemons list
        </h2>

        <FilterNavbar />
      </div>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
        {loading && [...Array.from({ length: 8 })].map((_, index) => {
          return (
            <PokemonListItemsLoading
              key={index} />
          )
        })}

        {!loading && list.map((item) => {
          return (
            <Link
              key={item.id}
              href={`/detail/${encodeURIComponent(item.name)}`}
              passHref>
              <a>
                <PokemonListItem
                  data={item}
                  owned={findOwnedById(item.id)} />
              </a>
            </Link>
          )
        })}
      </div>

      <div className="flex justify-between mt-3">
        <Button
          disabled={!canPrev || loading}
          onClick={() => canPrev && prevPage()}>
          Prev
        </Button>
        <div className={classNames({ 'font-loading': loading })}>
          {page} / {totalPage}
        </div>
        <Button
          disabled={!canNext || loading}
          onClick={() => canNext && nextPage()}>
          Next
        </Button>
      </div>
    </>
  )
}

export default PokemonList
