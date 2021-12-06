import { useState } from 'react'

export function useModal (initialShow = false) {
  const [isShow, setShow] = useState(initialShow)

  function show () {
    setShow(true)
  }

  function hide () {
    setShow(false)
  }

  return {
    show,
    hide,
    isShow,
  }
}
