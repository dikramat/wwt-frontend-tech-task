import { create } from 'zustand'

import type { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'

type FilterStore = {
	appliedFilters: SearchRequestFilter
	setAppliedFilters: (filters: SearchRequestFilter) => void
	clearAppliedFilters: () => void
}

export const useFilterStore = create<FilterStore>(set => ({
	appliedFilters: [],
	setAppliedFilters: filters => set({ appliedFilters: filters }),
	clearAppliedFilters: () => set({ appliedFilters: [] })
}))
