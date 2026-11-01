import { fireEvent, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import { FilterType } from '@/shared/api/types/Filter'
import { useFilterStore } from '@/shared/store/useFilterStore'
import { renderWithProviders } from '@/test/renderWithProviders'

import { App } from './App'

const labels = {
	homeTitle: 'WinWinTravel frontend test task',
	openFilters: 'Open filters',
	filterTitle: 'Filter',
	closePopup: 'Close popup',
	breakfast: 'Breakfast included'
} as const

describe('Home page', () => {
	beforeEach(() => {
		useFilterStore.setState({ appliedFilters: [] })
	})

	it('shows the homepage and keeps the JSON article hidden with no applied filters', () => {
		renderWithProviders(<App />)

		expect(
			screen.getByRole('heading', { name: labels.homeTitle })
		).toBeInTheDocument()
		expect(
			screen.getByRole('button', { name: labels.openFilters })
		).toBeInTheDocument()
		expect(screen.queryByRole('article')).not.toBeInTheDocument()
	})

	it('opens filters, pre-fills saved choices and displays applied JSON', async () => {
		useFilterStore.setState({
			appliedFilters: [
				{
					id: 'MEAL_OPTIONS',
					type: FilterType.OPTION,
					optionsIds: ['breakfast']
				}
			]
		})
		renderWithProviders(<App />)

		expect(JSON.parse(screen.getByRole('article').textContent ?? '')).toEqual([
			{
				id: 'MEAL_OPTIONS',
				type: FilterType.OPTION,
				optionsIds: ['breakfast']
			}
		])
		fireEvent.click(screen.getByRole('button', { name: labels.openFilters }))

		await waitFor(() =>
			expect(
				screen.getByRole('checkbox', { name: labels.breakfast })
			).toBeChecked()
		)
		expect(
			screen.getByRole('dialog', { name: labels.filterTitle })
		).toBeInTheDocument()
		fireEvent.click(screen.getByRole('button', { name: labels.closePopup }))
		expect(
			screen.queryByRole('dialog', { name: labels.filterTitle })
		).not.toBeInTheDocument()
	})
})
