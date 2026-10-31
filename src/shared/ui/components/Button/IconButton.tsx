import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'

import { BaseButton } from './BaseButton'

type IconButtonProps = Omit<
	ComponentPropsWithoutRef<'button'>,
	'aria-label' | 'children'
> & {
	'aria-label': string
	icon: ReactNode
}

export const IconButton = ({ className, icon, ...props }: IconButtonProps) => (
	<BaseButton
		className={twMerge(
			'size-6 shrink-0 gap-0 rounded-none border-2 border-transparent bg-transparent p-0 text-inherit',
			className
		)}
		{...props}
	>
		{icon}
	</BaseButton>
)
