import { useMemo, useState } from 'react'

export function useSequence (queue: string[]) {
  const [index, setIndex] = useState(-1)

  const current = useMemo(() => {
    return queue[index]
  }, [index, queue])

  function start () {
    setIndex(0)
  }

  function next () {
    setIndex((value) => value + 1)
  }

  function previous () {
    setIndex((value) => value - 1)
  }

  return {
    index,
    next,
    prev: previous,
    start,
    current,
  }
}
