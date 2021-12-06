import classNames from 'classnames'
import { FC } from 'react'
import { PokemonListItem } from '../../api/pokemons'
import { createRect } from '../../utils/image'
import { Card } from '../base/card'
import { ImagePixelated } from '../base/image'

interface PokemonListItemProps {
  className?: string;
  data: PokemonListItem;
  owned?: number;
  nickname?: string;
}

export const PokemonListItems: FC<PokemonListItemProps> = (properties) => {
  const isColored = Boolean((properties.nickname) || (properties.owned && properties.owned > 0))

  return (
    <Card className={classNames(properties.className)}>
      <ImagePixelated
        src={properties.data.image}
        colored={isColored} />

      <div className="px-2">
        <div className="text-lg capitalize">
          {properties.data.name}
        </div>
        <div className="flex justify-between text-sm">
          <span>
            #{String(properties.data.id).padStart(4, '0')}
          </span>
          {properties.nickname ? (
            <span>
              { properties.nickname }
            </span>
          ) : (
            <span>
              owned: {properties.owned ?? 0}
            </span>
          )}
        </div>
      </div>
    </Card>
  )
}

export const PokemonListItemsLoading: FC = () => {
  const dummyData: PokemonListItem = {
    name : 'Loading...',
    id   : 0,
    image: createRect(160),
  }

  return (
    <PokemonListItems
      className="font-loading animate-pulse"
      data={dummyData} />
  )
}
