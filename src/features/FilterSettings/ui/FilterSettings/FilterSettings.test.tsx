import { fireEvent, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { type FilterItem, FilterType } from '@/shared/api/types/Filter'
import { useFilterStore } from '@/shared/store/useFilterStore'
import { renderWithProviders } from '@/test/renderWithProviders'

import { FilterSettings } from './FilterSettings'

const filterItems: FilterItem[] = [
	{
		id: 'FACILITIES',
		name: 'Facilities',
		type: FilterType.OPTION,
		options: [
			{ id: 'pool', name: 'Pool' },
			{ id: 'parking', name: 'Parking' }
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

		expect(screen.getByRole('dialog', { name: 'Filter' })).toBeInTheDocument()
		expect(document.querySelector('[aria-busy="true"]')).toBeInTheDocument()
		expect(screen.queryAllByRole('checkbox')).toHaveLength(0)
		expect(screen.getByRole('button', { name: 'Apply' })).toBeDisabled()
		expect(
			screen.getByRole('button', { name: 'Clear all parameters' })
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

		expect(screen.getByRole('checkbox', { name: 'Pool' })).toBeChecked()
		fireEvent.click(
			screen.getByRole('button', { name: 'Clear all parameters' })
		)

		expect(screen.getByRole('checkbox', { name: 'Pool' })).not.toBeChecked()
		expect(useFilterStore.getState().appliedFilters).toEqual(appliedFilters)
		fireEvent.click(screen.getByRole('button', { name: 'Close popup' }))
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

		fireEvent.click(screen.getByRole('checkbox', { name: 'Parking' }))
		expect(useFilterStore.getState().appliedFilters).toEqual(appliedFilters)
		fireEvent.click(screen.getByRole('button', { name: 'Apply' }))

		const confirmation = screen.getByRole('dialog', {
			name: 'Do you want to apply new filter'
		})
		expect(confirmation).toBeInTheDocument()
		fireEvent.click(screen.getByRole('button', { name: 'Use old filter' }))
		expect(
			screen.queryByRole('dialog', { name: 'Do you want to apply new filter' })
		).not.toBeInTheDocument()
		expect(useFilterStore.getState().appliedFilters).toEqual(appliedFilters)
		expect(onClose).not.toHaveBeenCalled()

		fireEvent.click(screen.getByRole('button', { name: 'Apply' }))
		fireEvent.click(screen.getByRole('button', { name: 'Apply new filter' }))

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
			screen.getByRole('button', { name: 'Clear all parameters' })
		)
		fireEvent.click(screen.getByRole('button', { name: 'Apply' }))
		expect(useFilterStore.getState().appliedFilters).toEqual(appliedFilters)
		fireEvent.click(screen.getByRole('button', { name: 'Apply new filter' }))

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

		fireEvent.click(screen.getByRole('checkbox', { name: 'Pool' }))
		fireEvent.click(screen.getByRole('button', { name: 'Apply' }))
		fireEvent.click(screen.getByRole('button', { name: 'Apply new filter' }))

		expect(useFilterStore.getState().appliedFilters).toEqual([])
	})
})
