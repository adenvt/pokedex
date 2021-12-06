import { useSequence } from "./use-sequence"
import { renderHook, act } from '@testing-library/react-hooks'

describe('use-sequence', () => {
  it('should be undefined if not started', () => {
    const { result } = renderHook(() => useSequence(['uno', 'dos', 'tres', 'cuatro', 'cinco']))

    expect(result.current.current).toBe(undefined)
  })

  it('should be first item (uno) if started', () => {
    const { result } = renderHook(() => useSequence(['uno', 'dos', 'tres', 'cuatro', 'cinco']))

    act(() => result.current.start())

    expect(result.current.current).toBe('uno')
  })

  it('should be next item (uno -> dos) if next called', () => {
    const { result } = renderHook(() => useSequence(['uno', 'dos', 'tres', 'cuatro', 'cinco']))

    act(() => result.current.start())
    expect(result.current.current).toBe('uno')

    act(() => result.current.next())
    expect(result.current.current).toBe('dos')
  })

  it('should be prev item (uno <- dos) if prev called', () => {
    const { result } = renderHook(() => useSequence(['uno', 'dos', 'tres', 'cuatro', 'cinco']))

    act(() => result.current.start())
    expect(result.current.current).toBe('uno')

    act(() => result.current.next())
    expect(result.current.current).toBe('dos')

    act(() => result.current.prev())
    expect(result.current.current).toBe('uno')
  })

  it('should be undefined again if reset called', () => {
    const { result } = renderHook(() => useSequence(['uno', 'dos', 'tres', 'cuatro', 'cinco']))

    act(() => result.current.start())
    expect(result.current.current).toBe('uno')

    act(() => result.current.reset())
    expect(result.current.current).toBe(undefined)
  })
})
