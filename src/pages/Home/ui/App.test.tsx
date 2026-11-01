import { fireEvent, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import { FilterType } from '@/shared/api/types/Filter'
import { useFilterStore } from '@/shared/store/useFilterStore'
import { renderWithProviders } from '@/test/renderWithProviders'

import { App } from './App'

describe('Home page', () => {
	beforeEach(() => {
		useFilterStore.setState({ appliedFilters: [] })
	})

	it('shows the homepage and keeps the JSON article hidden with no applied filters', () => {
		renderWithProviders(<App />)

		expect(
			screen.getByRole('heading', { name: 'WinWinTravel frontend test task' })
		).toBeInTheDocument()
		expect(
			screen.getByRole('button', { name: 'Open filters' })
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
		fireEvent.click(screen.getByRole('button', { name: 'Open filters' }))

		await waitFor(() =>
			expect(
				screen.getByRole('checkbox', { name: 'Breakfast included' })
			).toBeChecked()
		)
		expect(screen.getByRole('dialog', { name: 'Filter' })).toBeInTheDocument()
		fireEvent.click(screen.getByRole('button', { name: 'Close popup' }))
		expect(
			screen.queryByRole('dialog', { name: 'Filter' })
		).not.toBeInTheDocument()
	})
})
