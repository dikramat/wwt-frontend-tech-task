import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { type FilterItem, FilterType } from '@/shared/api/types/Filter'
import { useFilterStore } from '@/shared/store/useFilterStore'

import { useFilterSettings } from './useFilterSettings'

const labels = {
	facilities: 'Facilities',
	pool: 'Pool'
} as const

const filter: FilterItem = {
	id: 'FACILITIES',
	name: labels.facilities,
	type: FilterType.OPTION,
	options: [{ id: 'pool', name: labels.pool }]
}

describe('useFilterSettings', () => {
	beforeEach(() => {
		useFilterStore.setState({ appliedFilters: [] })
	})

	it('keeps the draft empty when unchecking an option not currently selected', () => {
		const { result } = renderHook(() => useFilterSettings(vi.fn()))

		act(() => result.current.toggleOption(filter, 'pool', false))

		expect(result.current.draftFilters).toEqual([])
	})
})
