import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Divider } from './Divider'

const labels = {
	sectionDivider: 'Section divider'
} as const

describe('Divider', () => {
	it('renders a horizontal rule and merges caller classes', () => {
		render(
			<Divider
				aria-label={labels.sectionDivider}
				className="border-t-4"
			/>
		)

		const divider = screen.getByRole('separator', {
			name: labels.sectionDivider
		})

		expect(divider).toHaveClass('w-full', 'border-t-4')
		expect(divider).not.toHaveClass('border-t-2')
	})

	it('uses its default classes when no className is provided', () => {
		render(<Divider />)

		expect(screen.getByRole('separator')).toHaveClass(
			'w-full',
			'border-t-2',
			'border-black-grey-200'
		)
	})
})
