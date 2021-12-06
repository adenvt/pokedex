import { FC, ReactElement, useState } from 'react'
import { useMount } from 'react-use'

export const ClientOnly: FC = (properties) => {
  const [isMounted, setIsMounted] = useState(false)

  useMount(() => {
    setIsMounted(true)
  })

  if (!isMounted)
    return null

  return properties.children as ReactElement
}
