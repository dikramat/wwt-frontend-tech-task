import { beforeEach, describe, expect, it } from 'vitest'

import { FilterType } from '@/shared/api/types/Filter'

import { useFilterStore } from './useFilterStore'

describe('useFilterStore', () => {
	beforeEach(() => {
		useFilterStore.setState({ appliedFilters: [] })
	})

	it('replaces the applied filters', () => {
		const selectedFilters = [
			{ id: 'FACILITIES', type: FilterType.OPTION, optionsIds: ['pool'] }
		]

		useFilterStore.getState().setAppliedFilters(selectedFilters)

		expect(useFilterStore.getState().appliedFilters).toEqual(selectedFilters)
	})

	it('clears the applied filters', () => {
		useFilterStore
			.getState()
			.setAppliedFilters([
				{ id: 'FACILITIES', type: FilterType.OPTION, optionsIds: ['pool'] }
			])

		useFilterStore.getState().clearAppliedFilters()

		expect(useFilterStore.getState().appliedFilters).toEqual([])
	})
})
