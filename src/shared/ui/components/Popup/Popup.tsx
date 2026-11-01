import { type PropsWithChildren, useId } from 'react'

import { twMerge } from 'tailwind-merge'

import { PopupContext } from './PopupContext'

type PopupProps = PropsWithChildren<{
	className?: string
}>

export const Popup = ({ children, className }: PopupProps) => {
	const titleId = useId()

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
			<PopupContext.Provider value={titleId}>
				<section
					aria-labelledby={titleId}
					aria-modal="true"
					className={twMerge(
						'flex max-h-full min-h-0 w-full max-w-7xl flex-col overflow-hidden rounded-2xl bg-white',
						className
					)}
					role="dialog"
				>
					{children}
				</section>
			</PopupContext.Provider>
		</div>
	)
}
