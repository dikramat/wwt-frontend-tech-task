import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { FilterSection } from './FilterSection'

const options = [
	{ id: 'breakfast', name: 'Breakfast included' },
	{ id: 'pool', name: 'Pool' }
]

describe('FilterSection', () => {
	it('renders its title and options with selected values', () => {
		render(
			<FilterSection
				onOptionToggle={vi.fn()}
				options={options}
				selectedOptionIds={['pool']}
				title="Meal options"
			/>
		)

		expect(
			screen.getByRole('heading', { name: 'Meal options' })
		).toBeInTheDocument()
		expect(screen.getByRole('checkbox', { name: 'Pool' })).toBeChecked()
		expect(
			screen.getByRole('checkbox', { name: 'Breakfast included' })
		).not.toBeChecked()
	})

	it('reports option changes to its caller', () => {
		const onOptionToggle = vi.fn()
		render(
			<FilterSection
				onOptionToggle={onOptionToggle}
				options={options}
				selectedOptionIds={[]}
				title="Facilities"
			/>
		)

		fireEvent.click(screen.getByRole('checkbox', { name: 'Pool' }))

		expect(onOptionToggle).toHaveBeenCalledWith('pool', true)
	})
})
