import { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { MyPokemon, useMyPokemons } from '../api/my-pokemon'
import { Button } from '../components/base/button'
import { Card } from '../components/base/card'
import { Modal } from '../components/base/modal'
import { FilterNavbar } from '../components/layout/navbar'
import { PokemonListItem } from '../components/pages/pokemons'
import { ClientOnly } from '../components/utils/ClientOnly'
import { useModal } from '../composition/use-modal'
import { toast } from 'react-toastify'

const MyPokemons: NextPage = () => {
  const { list,
    canPrev,
    canNext,
    nextPage,
    prevPage,
    page,
    totalPage,
    removePokemon } = useMyPokemons()

  const [deleteItem, setDeleteItem] = useState<MyPokemon | undefined>()
  const deleteModal                 = useModal()

  function confirmDelete (item: MyPokemon) {
    setDeleteItem(item)
    deleteModal.show()
  }

  function submitDelete () {
    if (!deleteItem)
      return

    toast.success(`${deleteItem.nickname} (${deleteItem.name}) releasing successfully`)

    removePokemon(deleteItem, deleteItem?.nickname)
    setDeleteItem(undefined)
    deleteModal.hide()
  }

  return (
    <>
      <div className="flex items-center justify-between py-3">
        <h2 className="text-lg">
          Pokemons list
        </h2>

        <FilterNavbar />
      </div>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        <ClientOnly>
          {list.length === 0 && (
            <Card className="flex items-center justify-center w-full h-48 col-span-2">
              {"- You haven't catch any pokemon yet -"}
            </Card>
          )}

          {list.length > 0 && list.map((item, index) => {
            return (
              <div key={index}>
                <Link
                  href={`/detail/${encodeURIComponent(item.name)}`}
                  passHref>
                  <a>
                    <PokemonListItem
                      data={item}
                      nickname={item.nickname} />
                  </a>
                </Link>
                <div className="py-2 text-center">
                  <Button onClick={() => confirmDelete(item)}>
                    Release
                  </Button>
                </div>
              </div>
            )
          })}
        </ClientOnly>
      </div>

      <div className="flex justify-between mt-3">
        <ClientOnly>
          {list.length > 0 && (
            <>
              <Button
                disabled={!canPrev}
                onClick={() => canPrev && prevPage()}>
                Prev
              </Button>
              <div>
                {page} / {totalPage}
              </div>
              <Button
                disabled={!canNext}
                onClick={() => canNext && nextPage()}>
                Next
              </Button>
            </>
          )}
        </ClientOnly>
      </div>

      {deleteModal.isShow && deleteItem && (
        <Modal onClose={() => deleteModal.hide()}>
          {`Are you sure to release "${deleteItem.nickname} (${deleteItem.name})"` }??

          <div className="flex justify-center gap-2 mt-3">
            <Button className="border-dashed" onClick={() => deleteModal.hide()}>
              No
            </Button>
            <Button onClick={submitDelete}>
              Yes
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}

export default MyPokemons
