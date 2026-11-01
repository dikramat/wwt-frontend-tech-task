import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { FilterSection } from './FilterSection'

const labels = {
	mealOptions: 'Meal options',
	facilities: 'Facilities',
	pool: 'Pool',
	breakfast: 'Breakfast included'
} as const

const options = [
	{ id: 'breakfast', name: labels.breakfast },
	{ id: 'pool', name: labels.pool }
]

describe('FilterSection', () => {
	it('renders its title and options with selected values', () => {
		render(
			<FilterSection
				onOptionToggle={vi.fn()}
				options={options}
				selectedOptionIds={['pool']}
				title={labels.mealOptions}
			/>
		)

		expect(
			screen.getByRole('heading', { name: labels.mealOptions })
		).toBeInTheDocument()
		expect(screen.getByRole('checkbox', { name: labels.pool })).toBeChecked()
		expect(
			screen.getByRole('checkbox', { name: labels.breakfast })
		).not.toBeChecked()
	})

	it('reports option changes to its caller', () => {
		const onOptionToggle = vi.fn()
		render(
			<FilterSection
				onOptionToggle={onOptionToggle}
				options={options}
				selectedOptionIds={[]}
				title={labels.facilities}
			/>
		)

		fireEvent.click(screen.getByRole('checkbox', { name: labels.pool }))

		expect(onOptionToggle).toHaveBeenCalledWith('pool', true)
	})
})
