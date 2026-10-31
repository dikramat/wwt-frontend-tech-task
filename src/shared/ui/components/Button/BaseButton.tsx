import type { ComponentPropsWithoutRef } from 'react'

import { twMerge } from 'tailwind-merge'

type BaseButtonProps = ComponentPropsWithoutRef<'button'>

export const BaseButton = ({
	className,
	children,
	type = 'button',
	...props
}: BaseButtonProps) => (
	<button
		className={twMerge(
			'inline-flex items-center justify-center transition-all active:border-4 active:border-neutral-500 active:shadow-inner',
			className
		)}
		type={type}
		{...props}
	>
		{children}
	</button>
)
