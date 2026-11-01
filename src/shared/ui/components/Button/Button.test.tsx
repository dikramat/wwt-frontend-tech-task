import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { BaseButton } from './BaseButton'
import { Button } from './Button'
import { IconButton } from './IconButton'
import { LinkLikeButton } from './LinkLikeButton'

const labels = {
	openFilters: 'Open filters',
	submit: 'Submit',
	clearParameters: 'Clear all parameters'
} as const

describe('button components', () => {
	it('uses button type by default and lets caller classes override defaults', () => {
		render(
			<Button
				className="w-auto"
				onClick={vi.fn()}
			>
				{labels.openFilters}
			</Button>
		)

		const button = screen.getByRole('button', { name: labels.openFilters })

		expect(button).toHaveAttribute('type', 'button')
		expect(button).toHaveClass('w-auto')
		expect(button).not.toHaveClass('w-70')
	})

	it('forwards an explicit button type through BaseButton', () => {
		render(<BaseButton type="submit">{labels.submit}</BaseButton>)

		expect(screen.getByRole('button', { name: labels.submit })).toHaveAttribute(
			'type',
			'submit'
		)
	})

	it('renders an accessible icon button and invokes its handler', () => {
		const onClick = vi.fn()
		render(
			<IconButton
				aria-label="Close popup"
				icon={<span aria-hidden="true">×</span>}
				onClick={onClick}
			/>
		)

		fireEvent.click(screen.getByRole('button', { name: 'Close popup' }))

		expect(onClick).toHaveBeenCalledOnce()
	})

	it('renders a link-like button as an actionable button', () => {
		const onClick = vi.fn()
		render(
			<LinkLikeButton onClick={onClick}>
				{labels.clearParameters}
			</LinkLikeButton>
		)

		fireEvent.click(
			screen.getByRole('button', { name: labels.clearParameters })
		)

		expect(onClick).toHaveBeenCalledOnce()
	})
})
