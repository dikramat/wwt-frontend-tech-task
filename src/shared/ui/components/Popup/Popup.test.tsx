import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Popup, PopupBody, PopupFooter, PopupHeader } from './index'

const labels = {
	filterContent: 'Filter content',
	applyAction: 'Apply action',
	bodyContent: 'Body'
} as const

describe('Popup components', () => {
	it('provides an accessible dialog, title, body, footer and close action', () => {
		const onClose = vi.fn()
		render(
			<Popup>
				<PopupHeader
					closeLabel="Close popup"
					onClose={onClose}
					title="Filter"
				/>
				<PopupBody>{labels.filterContent}</PopupBody>
				<PopupFooter>{labels.applyAction}</PopupFooter>
			</Popup>
		)

		const dialog = screen.getByRole('dialog', { name: 'Filter' })
		expect(dialog).toHaveAttribute('aria-modal', 'true')
		expect(screen.getByText(labels.filterContent)).toBeInTheDocument()
		expect(
			screen.getByText(labels.applyAction).closest('footer')
		).toBeInTheDocument()
		expect(screen.getByRole('separator')).toBeInTheDocument()

		fireEvent.click(screen.getByRole('button', { name: 'Close popup' }))
		expect(onClose).toHaveBeenCalledOnce()
	})

	it('supports a compact header without a divider and merges body classes', () => {
		render(
			<Popup>
				<PopupHeader
					closeLabel="Close popup"
					onClose={vi.fn()}
					showDivider={false}
					title="Confirmation"
				/>
				<PopupBody className="px-2">{labels.bodyContent}</PopupBody>
			</Popup>
		)

		expect(
			screen.getByRole('dialog', { name: 'Confirmation' })
		).toBeInTheDocument()
		expect(screen.queryByRole('separator')).not.toBeInTheDocument()
		expect(screen.getByText(labels.bodyContent)).toHaveClass('px-2')
	})

	it('renders a header without a popup context', () => {
		render(
			<PopupHeader
				closeLabel="Close popup"
				onClose={vi.fn()}
				showDivider={false}
				title="Standalone title"
			/>
		)

		expect(
			screen.getByRole('heading', { name: 'Standalone title' })
		).not.toHaveAttribute('id')
	})
})
