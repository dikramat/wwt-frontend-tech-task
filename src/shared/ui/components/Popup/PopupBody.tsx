import type { ComponentPropsWithoutRef } from 'react'

import { twMerge } from 'tailwind-merge'

type PopupBodyProps = ComponentPropsWithoutRef<'div'>

export const PopupBody = ({
	className = '',
	children,
	...props
}: PopupBodyProps) => (
	<div
		className={twMerge(
			'min-h-0 flex-1 overflow-y-auto px-8 pt-6 pb-8',
			className
		)}
		{...props}
	>
		{children}
	</div>
)
