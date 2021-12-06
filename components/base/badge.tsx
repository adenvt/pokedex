import classNames from 'classnames'
import { FC } from 'react'

interface BadgeProps {
  className?: string
}

export const Badge: FC<BadgeProps> = (properties) => {
  return (
    <span className={classNames('px-1 border rounded border-retro-800', properties.className)}>
      {properties.children}
    </span>
  )
}
