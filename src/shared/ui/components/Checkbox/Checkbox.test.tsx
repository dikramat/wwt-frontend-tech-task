import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
	it('associates the visible label with its native input', () => {
		render(
			<Checkbox
				id="breakfast"
				label="Breakfast included"
			/>
		)

		const checkbox = screen.getByRole('checkbox', {
			name: 'Breakfast included'
		})

		expect(checkbox).toHaveAttribute('id', 'breakfast')
	})

	it('supports uncontrolled checked state and native input props', () => {
		render(
			<Checkbox
				defaultChecked
				label="Breakfast included"
			/>
		)

		const checkbox = screen.getByRole('checkbox', {
			name: 'Breakfast included'
		})

		expect(checkbox).toBeChecked()
		fireEvent.click(checkbox)
		expect(checkbox).not.toBeChecked()
	})
})
