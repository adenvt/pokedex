import { useMemo } from 'react'

export function usePagination (page = 1, perPage = 8, total = 0) {
  const limit = useMemo(() => {
    return perPage
  }, [perPage])

  const offset = useMemo(() => {
    return (page - 1) * perPage
  }, [page, perPage])

  const totalPage = useMemo(() => {
    return Math.ceil(total / limit)
  }, [limit, total])

  const canNext = useMemo(() => {
    return page < totalPage
  }, [page, totalPage])

  const canPrevious = useMemo(() => {
    return page > 1
  }, [page])

  return {
    offset,
    limit,
    totalPage,
    canPrev: canPrevious,
    canNext,
  }
}
