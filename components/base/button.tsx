import classNames from 'classnames'
import { FC, MouseEvent } from 'react'

interface ButtonProps {
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = (properties) => {
  return (
    <button
      data-testid="button"
      className={classNames(
        properties.className,
        'px-3 py-1 border-2 border-retro-800 hover:bg-retro-800 hover:text-retro disabled:opacity-50 disabled:bg-transparent disabled:text-current',
      )}
      onClick={properties.onClick}
      disabled={properties.disabled}>
      {properties.children}
    </button>
  )
}
