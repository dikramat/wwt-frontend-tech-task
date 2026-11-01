import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Checkbox } from './Checkbox'

const labels = {
	breakfast: 'Breakfast included'
} as const

describe('Checkbox', () => {
	it('associates the visible label with its native input', () => {
		render(
			<Checkbox
				id="breakfast"
				label={labels.breakfast}
			/>
		)

		const checkbox = screen.getByRole('checkbox', {
			name: labels.breakfast
		})

		expect(checkbox).toHaveAttribute('id', 'breakfast')
	})

	it('supports uncontrolled checked state and native input props', () => {
		render(
			<Checkbox
				defaultChecked
				label={labels.breakfast}
			/>
		)

		const checkbox = screen.getByRole('checkbox', {
			name: labels.breakfast
		})

		expect(checkbox).toBeChecked()
		fireEvent.click(checkbox)
		expect(checkbox).not.toBeChecked()
	})
})
