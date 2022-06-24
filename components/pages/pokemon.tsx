import classNames from 'classnames'
import { FC, useMemo, useRef, useState } from 'react'
import { PokemonDetail as Detail } from '../../api/pokemon'
import { createRect } from '../../utils/image'
import { Badge } from '../base/badge'
import { Card } from '../base/card'
import { ImagePixelated } from '../base/image'
import { Modal } from '../base/modal'
import { ProgressBar } from '../base/progress-bar'
import anime from 'animejs'
import { Button } from '../base/button'
import { useMount } from 'react-use'

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
  const [isSuccess, setSucess]    = useState(false)
  const [isFinished, setFinished] = useState(false)

  const pokemon   = useRef<HTMLDivElement | null>(null)
  const pokeball  = useRef<HTMLDivElement | null>(null)

  useMount(() => {
    start()
  })

  function start() {
    setFinished(false)

    const isCathed = Math.random() > 0.5
    const timeline = anime.timeline({ autoplay: false })

    timeline
      .add({
        targets  : pokemon.current,
        keyframes: [
          { opacity: 1, scale: 1, filter: 'brightness(1) blur(0px)' },
        ],
        duration: 25,
      })
      .add({
        targets  : pokeball.current,
        keyframes: [
          { scale: 2, translateY: '0%' },
          { scale: 0.75, translateY: '-15%' },
          { scale: 0.5, translateY: '45%' },
        ],
        duration : 820,
        direction: 'normal',
        easing   : 'linear'
      }, -50)
      .add({
        targets  : pokemon.current,
        keyframes: [
          { opacity: 1, scale: 1, filter: 'brightness(25) blur(0px)' },
          { opacity: 0, scale: 0, filter: 'brightness(200) blur(10px)' },
        ],
        duration: 820,
        delay   : 50,
        easing  : 'linear'
      })
      .add({
        targets   : pokeball.current,
        translateX: ['-2%', '4%', '-4%', '4%', '0%'],
        duration  : 1640,
        delay     : 50,
        direction : 'alternate',
        easing    : 'easeOutInSine',
      })

    if (isCathed === false) {
      timeline
        .add({
          targets  : pokemon.current,
          keyframes: [
            { opacity: 0, scale: 0, filter: 'brightness(200) blur(10px)' },
            { opacity: 1, scale: 1, filter: 'brightness(1) blur(0px)' },
          ],
          duration: 820,
          delay   : 50,
          easing  : 'linear'
        })
    }

    timeline.play()
    timeline.finished.then(() => {
      setSucess(isCathed)
      setFinished(true)
    })
  }

  function closeModal () {
    if (typeof onFinish === 'function')
      onFinish(isSuccess)
  }

  return (
    <Modal>
      <div className="relative">
        <div
          className="origin-bottom pointer-events-none"
          ref={pokemon}>
          <ImagePixelated
            data-id="pokemon"
            src={detail.sprites.front_default} />
        </div>
        <div
          className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none"
          ref={pokeball}>
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
