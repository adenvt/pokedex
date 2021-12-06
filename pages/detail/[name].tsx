import { NextPage } from 'next'
import { Button } from '../../components/base/button'
import { useRouter } from 'next/router'
import { PokemonCatch, PokemonDetail, PokemonDetailLoading } from '../../components/pages/pokemon'
import { useMemo, useState } from 'react'
import { usePokemonDetail } from '../../api/pokemon'
import { useMyPokemons } from '../../api/my-pokemon'
import { useModal } from '../../composition/use-modal'
import { Modal } from '../../components/base/modal'
import { toast } from 'react-toastify'

const DetailPage: NextPage = () => {
  const router = useRouter()
  const name   = useMemo(() => {
    return router.query.name
      && router.query.name.toString()
  }, [router.query.name])

  const { detail, loading }           = usePokemonDetail(name)
  const { findOwnedById, addPokemon } = useMyPokemons()

  const catchModal    = useModal()
  const nicknameModal = useModal()

  const [nickname, setNickname] = useState('')
  const [error, setError]       = useState('')

  function onCatchFinish (value: boolean) {
    catchModal.hide()

    if (value)
      nicknameModal.show()
  }

  function onSubmitNickname () {
    try {
      const value = nickname.trim()

      if (!detail || !value)
        return

      addPokemon(detail, value)

      nicknameModal.hide()
      toast.success(`${nickname} (${detail.name}) is successfully added into your collection`)

      router.push('/owned')
    } catch (error) {
      if (error instanceof Error)
        setError(error.message)
    }
  }

  return (
    <>
      <button className="hover:underline" onClick={() => router.back()}>
        &lt; Back
      </button>

      {loading
        && <PokemonDetailLoading />
      }

      {!loading && detail && (
        <>
          <PokemonDetail
            detail={detail}
            owned={findOwnedById(detail.id)} />

          {catchModal.isShow && (
            <PokemonCatch
              detail={detail}
              onFinish={onCatchFinish} />
          )}

          {nicknameModal.isShow && (
            <Modal>
              <div className="text-center">
                <h3 className="text-lg">
                  Change Nickname
                </h3>
              </div>
              <label htmlFor="nickname">
                Nickname
              </label>
              <input
                type="text"
                className="block w-full px-3 py-1 bg-transparent border-2 border-retro-800 focus:border-retro-600 focus:ring-retro-500"
                value={nickname}
                onInput={(event) => setNickname((event.target as HTMLInputElement).value)}/>

              {error && (
                <div>
                  ⚠ {error}
                </div>
              )}

              <div className="py-3 text-center">
                <Button
                  disabled={!nickname.trim()}
                  onClick={onSubmitNickname}>
                  Save
                </Button>
              </div>
            </Modal>
          )}
        </>
      )}

      <div className="my-3 text-center">
        <Button onClick={catchModal.show}>
          Catch Me
        </Button>
      </div>
    </>
  )
}

export default DetailPage
