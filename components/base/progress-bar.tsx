import classNames from 'classnames'
import { FC } from 'react'

interface BarProps {
  active: boolean
}

export const Bar: FC<BarProps> = ({ active }) => {
  return (
    <span
      data-testid="bar"
      data-active={active}
      className={
        classNames('flex-grow h-4', [active ? 'bg-retro-800' : 'bg-retro-600'])
      } />
  )
}

interface ProgressBarProps {
  className?: string;
  value: number;
  maxValue?: number;
  step?: number;
}

export const ProgressBar: FC<ProgressBarProps> = (properties) => {
  const maxvalue = properties.maxValue ?? 100
  const step     = properties.step ?? 20
  const value    = Math.floor(properties.value / maxvalue * step)

  return (
    <div
      data-testid="progress-bar"
      className={classNames('flex justify-between flex-auto gap-1', properties.className)}>
      {[...new Array(step)].map((_, index) => (
        <Bar
          key={index}
          active={index < value} />
      ))}
    </div>
  )
}
