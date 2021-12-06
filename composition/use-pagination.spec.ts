import { renderHook } from '@testing-library/react-hooks'
import { usePagination } from './use-pagination'

describe('use-pagination', () => {
  describe('counting limit and offset', () => {
    const cases = [
      [ 1, 5,  0, 5],
      [ 2, 5,  5, 5],
      [10, 5, 45, 5],
    ]

    it.each(cases)('page %s and perPage %s, should have offset %s and limit %s', (page, perPage, offset, limit) => {
      const { result } = renderHook(() => usePagination(page, perPage, 100))

      expect(result.current.limit).toBe(limit)
      expect(result.current.offset).toBe(offset)
    })
  })

  describe('couting totalPage based on perPage', () => {
    const cases = [
      [10, 10],
      [25,  4],
      [30,  4],
      [50,  2],
    ]

    it.each(cases)('totalData 100 and perPage %s, should have totalPage %s', (perPage, totalPage) => {
      const { result } = renderHook(() => usePagination(1, perPage, 100))

      expect(result.current.totalPage).toBe(totalPage)
    })
  })

  describe('canNext', () => {
    const cases = [
      [ 1,   true],
      [ 3,   true],
      [ 10, false],
    ]

    it.each(cases)('%s/10, canNext should be %s', (page, canNext) => {
      const { result } = renderHook(() => usePagination(Number(page), 10, 100))

      expect(result.current.canNext).toBe(canNext)
    })
  })

  describe('canPrev', () => {
    const cases = [
      [ 1,  false],
      [ 3,   true],
      [ 10,  true],
    ]

    it.each(cases)('%s/10, canPrev should be %s', (page, canPrev) => {
      const { result } = renderHook(() => usePagination(Number(page), 10, 100))

      expect(result.current.canPrev).toBe(canPrev)
    })
  })
})
