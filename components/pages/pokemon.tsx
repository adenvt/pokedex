import classNames from 'classnames'
import { FC, useMemo, useState } from 'react'
import { PokemonDetail as Detail } from '../../api/pokemon'
import { createRect } from '../../utils/image'
import { Badge } from '../base/badge'
import { Card } from '../base/card'
import { ImagePixelated } from '../base/image'
import { Modal } from '../base/modal'
import { ProgressBar } from '../base/progress-bar'
import animation from '../../styles/animation.module.css'
import { useMount } from 'react-use'
import { useSequence } from '../../composition/use-sequence'
import { Button } from '../base/button'

interface PokemonDetailProps {
  className?: string;
  detail: Detail;
  owned?: number;
}

export const PokemonDetail: FC<PokemonDetailProps> = ({ detail, owned, ...properties }) => {
  const [flip, setFlip] = useState(false)

  const source = useMemo(() => {
    return flip
      ? detail.sprites.back_default
      : detail.sprites.front_default
  }, [flip, detail])

  function togleImage () {
    setFlip((value) => !value)
  }

  return (
    <div
      data-testid="pokemon-detail"
      className={classNames(properties.className)}>
      <div
        className="cursor-pointer" onClick={() => togleImage()}>
        <ImagePixelated
          src={source}
          size={320}
          colored={Boolean(owned && owned > 0)} />

        <div className="text-sm text-center">
          ( click to rotate )
        </div>
      </div>

      <div className="flex items-baseline justify-between pb-3 capitalize">
        <h1 className="text-3xl">
          {detail.name}
        </h1>
        <h2 className="text-xl">
          #{String(detail.id).padStart(4, '0')}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Card>
          <dl className="grid grid-cols-2 gap-3 p-3 capitalize">
            <div>
              <dt className="text-sm underline">weight</dt>
              <dd className="text-lg">{detail.weight ?? '-'}</dd>
            </div>
            <div>
              <dt className="text-sm underline">type</dt>
              <dd className="flex flex-wrap gap-1">
                {detail.types.map((item, index) => {
                  return (
                    <Badge key={index}>
                      {item.type.name}
                    </Badge>
                  )
                })}
              </dd>
            </div>
            <div>
              <dt className="text-sm underline">height</dt>
              <dd className="text-lg">{detail.height}</dd>
            </div>
            <div>
              <dt className="text-sm underline">abilities</dt>
              <dd className="text-sm">
                <ul className="list-disc">
                  {detail.abilities.map((item, index) => {
                    return (
                      <li key={index}>
                        {item.ability.name}
                      </li>
                    )
                  })}
                </ul>
              </dd>
            </div>
          </dl>
        </Card>
        <Card className="grid grid-cols-2 gap-3 p-3 border-2 sm:grid-cols-2">
          {detail.stats.map((item, index) => {
            return (
              <div key={index}>
                <div className="flex justify-between gap-2 capitalize">
                  <span className="truncate">
                    {item.stat.name}
                  </span>
                  <span className="flex-shrink-0">
                    {item.base_stat}/100
                  </span>
                </div>
                <ProgressBar
                  value={item.base_stat}
                  maxValue={100}
                  step={10} />
              </div>
            )
          })}
        </Card>
      </div>
    </div>
  )
}

export const PokemonDetailLoading: FC = () => {
  const dummyData: Detail = {
    status   : false,
    message  : '',
    id       : 0,
    name     : 'Loading..',
    weight   : 0,
    height   : 0,
    abilities: [{ ability: { name: '----' } }, { ability: { name: '---' } }],
    stats    : [
      {
        stat     : { name: '---' },
        base_stat: 10,
      },
      {
        stat     : { name: '--' },
        base_stat: 0,
      },
      {
        stat     : { name: '----' },
        base_stat: 60,
      },
      {
        stat     : { name: '--' },
        base_stat: 30,
      },
      {
        stat     : { name: '----' },
        base_stat: 30,
      },
      {
        stat     : { name: '--' },
        base_stat: 0,
      },
    ],
    types  : [{ type: { name: '-----' } }],
    sprites: {
      front_default: createRect(320),
      back_default : createRect(320),
    },
  }

  return (
    <PokemonDetail
      className="font-loading animate-pulse"
      detail={dummyData} />
  )
}

interface PokemonCatchProps {
  detail: Detail;
  onFinish?: (result: boolean) => void;
}

export const PokemonCatch: FC<PokemonCatchProps> = ({ detail, onFinish }) => {
  const [isSuccess, setSucess] = useState(false)

  const seqPokeball = useSequence([
    'pokeballThrown',
    'pokeballShake',
    'pokeballFinish',
  ])

  const seqPokemon = useSequence([
    'pokemonDisappear',
    'pokemonHide',
    'pokemonEscape',
  ])

  const isFinished = useMemo(() => {
    if (isSuccess && seqPokemon.current === 'pokemonEscape')
      return true

    if (!isSuccess && seqPokeball.current === 'pokeballFinish')
      return true

    return false
  }, [isSuccess, seqPokeball, seqPokemon])

  function closeModal () {
    if (typeof onFinish === 'function')
      onFinish(isSuccess)
  }

  function start () {
    seqPokeball.start()
    seqPokemon.reset()

    setSucess(Math.random() > 0.5)
  }

  useMount(() => {
    start()
  })

  return (
    <Modal>
      <div className="relative">
        <div className={
            seqPokemon.current === 'pokemonDisappear' ? animation.pokemonDisappear
            : seqPokemon.current === 'pokemonHide' ? 'invisible'
            : seqPokemon.current === 'pokemonEscape' && isSuccess ? 'invisible'
            : seqPokemon.current === 'pokemonEscape' && !isSuccess ? animation.pokemonEscape
            : ''
          }
          onAnimationEnd={() => {
            seqPokemon.next()
            seqPokeball.next()
          }}
        >
          <ImagePixelated
            data-id="pokemon"
            src={detail.sprites.front_default} />
        </div>
        <div
          className={
              seqPokeball.current === 'pokeballThrown' ? animation.pokeballThrown
              : seqPokeball.current === 'pokeballShake' ? animation.pokeballShake
              : seqPokeball.current === 'pokeballFinish' && !isSuccess ? animation.pokeballHide
              : animation.pokeball
            }
          onAnimationEnd={() => seqPokemon.next()}>
          <ImagePixelated
            data-id="pokeball"
            src={require('../../assets/image/poke-ball.png')}
            size={100} />
        </div>

        <div className="text-center">
          <h3 className="capitalize">
            {!isFinished
              ? (`Catching ${detail.name}...`)
              : (isSuccess
                ? `Congratulation you caugth ${detail.name}`
                : `Oh no, ${detail.name} has been escape`)
            }
          </h3>

          <div className={classNames('mt-3 flex gap-3 justify-center', isFinished ? 'visible' : 'invisible')}>
            <Button
              onClick={closeModal}>
              {isSuccess ? 'Next' : 'Close'}
            </Button>

            {(isFinished && !isSuccess) && (
              <Button
                onClick={start}>
                Try Again
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}
