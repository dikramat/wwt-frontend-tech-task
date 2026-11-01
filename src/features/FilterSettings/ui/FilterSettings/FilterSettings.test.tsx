import { fireEvent, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { type FilterItem, FilterType } from '@/shared/api/types/Filter'
import { useFilterStore } from '@/shared/store/useFilterStore'
import { renderWithProviders } from '@/test/renderWithProviders'

import { FilterSettings } from './FilterSettings'

const labels = {
	filterTitle: 'Filter',
	facilities: 'Facilities',
	apply: 'Apply',
	clearParameters: 'Clear all parameters',
	pool: 'Pool',
	parking: 'Parking',
	closePopup: 'Close popup',
	confirmationTitle: 'Do you want to apply new filter',
	useOldFilter: 'Use old filter',
	applyNewFilter: 'Apply new filter'
} as const

const filterItems: FilterItem[] = [
	{
		id: 'FACILITIES',
		name: labels.facilities,
		type: FilterType.OPTION,
		options: [
			{ id: 'pool', name: labels.pool },
			{ id: 'parking', name: labels.parking }
		]
	}
]

describe('FilterSettings', () => {
	beforeEach(() => {
		useFilterStore.setState({ appliedFilters: [] })
	})

	it('shows a skeleton and disables actions while filters are loading', () => {
		renderWithProviders(
			<FilterSettings
				filterItems={undefined}
				onClose={vi.fn()}
			/>
		)

		expect(
			screen.getByRole('dialog', { name: labels.filterTitle })
		).toBeInTheDocument()
		expect(document.querySelector('[aria-busy="true"]')).toBeInTheDocument()
		expect(screen.queryAllByRole('checkbox')).toHaveLength(0)
		expect(screen.getByRole('button', { name: labels.apply })).toBeDisabled()
		expect(
			screen.getByRole('button', { name: labels.clearParameters })
		).toBeDisabled()
	})

	it('prefills saved filters and only changes the draft when clearing', () => {
		const appliedFilters = [
			{ id: 'FACILITIES', type: FilterType.OPTION, optionsIds: ['pool'] }
		]
		const onClose = vi.fn()
		useFilterStore.setState({ appliedFilters })
		renderWithProviders(
			<FilterSettings
				filterItems={filterItems}
				onClose={onClose}
			/>
		)

		expect(screen.getByRole('checkbox', { name: labels.pool })).toBeChecked()
		fireEvent.click(
			screen.getByRole('button', { name: labels.clearParameters })
		)

		expect(
			screen.getByRole('checkbox', { name: labels.pool })
		).not.toBeChecked()
		expect(useFilterStore.getState().appliedFilters).toEqual(appliedFilters)
		fireEvent.click(screen.getByRole('button', { name: labels.closePopup }))
		expect(onClose).toHaveBeenCalledOnce()
		expect(useFilterStore.getState().appliedFilters).toEqual(appliedFilters)
	})

	it('keeps stored filters on confirmation cancel and commits only on confirmation', async () => {
		const appliedFilters = [
			{ id: 'FACILITIES', type: FilterType.OPTION, optionsIds: ['pool'] }
		]
		const onClose = vi.fn()
		useFilterStore.setState({ appliedFilters })
		renderWithProviders(
			<FilterSettings
				filterItems={filterItems}
				onClose={onClose}
			/>
		)

		fireEvent.click(screen.getByRole('checkbox', { name: labels.parking }))
		expect(useFilterStore.getState().appliedFilters).toEqual(appliedFilters)
		fireEvent.click(screen.getByRole('button', { name: labels.apply }))

		const confirmation = screen.getByRole('dialog', {
			name: labels.confirmationTitle
		})
		expect(confirmation).toBeInTheDocument()
		fireEvent.click(screen.getByRole('button', { name: labels.useOldFilter }))
		expect(
			screen.queryByRole('dialog', { name: labels.confirmationTitle })
		).not.toBeInTheDocument()
		expect(useFilterStore.getState().appliedFilters).toEqual(appliedFilters)
		expect(onClose).not.toHaveBeenCalled()

		fireEvent.click(screen.getByRole('button', { name: labels.apply }))
		fireEvent.click(screen.getByRole('button', { name: labels.applyNewFilter }))

		await waitFor(() =>
			expect(useFilterStore.getState().appliedFilters).toEqual([
				{
					id: 'FACILITIES',
					type: FilterType.OPTION,
					optionsIds: ['pool', 'parking']
				}
			])
		)
		expect(onClose).toHaveBeenCalledOnce()
	})

	it('confirms clearing before removing stored filters', () => {
		const appliedFilters = [
			{ id: 'FACILITIES', type: FilterType.OPTION, optionsIds: ['pool'] }
		]
		useFilterStore.setState({ appliedFilters })
		renderWithProviders(
			<FilterSettings
				filterItems={filterItems}
				onClose={vi.fn()}
			/>
		)

		fireEvent.click(
			screen.getByRole('button', { name: labels.clearParameters })
		)
		fireEvent.click(screen.getByRole('button', { name: labels.apply }))
		expect(useFilterStore.getState().appliedFilters).toEqual(appliedFilters)
		fireEvent.click(screen.getByRole('button', { name: labels.applyNewFilter }))

		expect(useFilterStore.getState().appliedFilters).toEqual([])
	})

	it('removes a filter from the draft when its last option is unchecked', () => {
		useFilterStore.setState({
			appliedFilters: [
				{ id: 'FACILITIES', type: FilterType.OPTION, optionsIds: ['pool'] }
			]
		})
		renderWithProviders(
			<FilterSettings
				filterItems={filterItems}
				onClose={vi.fn()}
			/>
		)

		fireEvent.click(screen.getByRole('checkbox', { name: labels.pool }))
		fireEvent.click(screen.getByRole('button', { name: labels.apply }))
		fireEvent.click(screen.getByRole('button', { name: labels.applyNewFilter }))

		expect(useFilterStore.getState().appliedFilters).toEqual([])
	})
})
