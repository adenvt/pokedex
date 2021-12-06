

import { renderHook, act } from '@testing-library/react-hooks'
import { useModal } from './use-modal'

describe('use-modal', () => {
  it('should be true if show called', () => {
    const { result } = renderHook(() => useModal())

    act(() => {
      result.current.show()
    })

    expect(result.current.isShow).toBe(true)
  })

  it('should be false if hide called', () => {
    const { result } = renderHook(() => useModal())

    act(() => {
      result.current.hide()
    })

    expect(result.current.isShow).toBe(false)
  })

  it('should be false on initial (if not set)', () => {
    const { result } = renderHook(() => useModal())

    expect(result.current.isShow).toBe(false)
  })

  it('should be equal with initial state', () => {
    const initialState = true
    const { result }   = renderHook(() => useModal(initialState))

    expect(result.current.isShow).toBe(initialState)
  })
})
