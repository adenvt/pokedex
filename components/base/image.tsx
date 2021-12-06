import { FC } from 'react'
import classNames from 'classnames'
import Image from 'next/image'

interface ImgPixelatedProps {
  src: string;
  size?: number;
  className?: string;
  colored?: boolean;
}

export const ImagePixelated: FC<ImgPixelatedProps> = (properties) => {
  return (
    <div className="flex items-center justify-center w-full">
      <Image
        alt="Sprite Image"
        src={properties.src}
        width={properties.size ?? 160}
        height={properties.size ?? 160}
        className={classNames(properties.className, 'mx-auto filter rendering-pixelated', {
          'saturate-0'  : !properties.colored,
          'contrast-200': !properties.colored,
          'opacity-60'  : !properties.colored,
        })}
      />
    </div>
  )
}
