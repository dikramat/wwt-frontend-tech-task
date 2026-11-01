import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Popup, PopupBody, PopupFooter, PopupHeader } from './index'

const labels = {
	filterContent: 'Filter content',
	applyAction: 'Apply action',
	bodyContent: 'Body',
	closePopup: 'Close popup',
	filterTitle: 'Filter',
	confirmationTitle: 'Confirmation',
	standaloneTitle: 'Standalone title'
} as const

describe('Popup components', () => {
	it('provides an accessible dialog, title, body, footer and close action', () => {
		const onClose = vi.fn()
		render(
			<Popup>
				<PopupHeader
					closeLabel={labels.closePopup}
					onClose={onClose}
					title={labels.filterTitle}
				/>
				<PopupBody>{labels.filterContent}</PopupBody>
				<PopupFooter>{labels.applyAction}</PopupFooter>
			</Popup>
		)

		const dialog = screen.getByRole('dialog', { name: labels.filterTitle })
		expect(dialog).toHaveAttribute('aria-modal', 'true')
		expect(screen.getByText(labels.filterContent)).toBeInTheDocument()
		expect(
			screen.getByText(labels.applyAction).closest('footer')
		).toBeInTheDocument()
		expect(screen.getByRole('separator')).toBeInTheDocument()

		fireEvent.click(screen.getByRole('button', { name: labels.closePopup }))
		expect(onClose).toHaveBeenCalledOnce()
	})

	it('supports a compact header without a divider and merges body classes', () => {
		render(
			<Popup>
				<PopupHeader
					closeLabel={labels.closePopup}
					onClose={vi.fn()}
					showDivider={false}
					title={labels.confirmationTitle}
				/>
				<PopupBody className="px-2">{labels.bodyContent}</PopupBody>
			</Popup>
		)

		expect(
			screen.getByRole('dialog', { name: labels.confirmationTitle })
		).toBeInTheDocument()
		expect(screen.queryByRole('separator')).not.toBeInTheDocument()
		expect(screen.getByText(labels.bodyContent)).toHaveClass('px-2')
	})

	it('renders a header without a popup context', () => {
		render(
			<PopupHeader
				closeLabel={labels.closePopup}
				onClose={vi.fn()}
				showDivider={false}
				title={labels.standaloneTitle}
			/>
		)

		expect(
			screen.getByRole('heading', { name: labels.standaloneTitle })
		).not.toHaveAttribute('id')
	})
})
