import classNames from 'classnames'
import { FC } from 'react'

interface ComponentProps {
  className?: string;
  title?: string;
}

export const Card: FC<ComponentProps> = ({ children, className }) => {
  return (
    <div className={classNames('border-2 border-retro-800 relative', className)}>
      {children}
    </div>
  )
}
