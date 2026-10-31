import type { ComponentPropsWithoutRef } from 'react'

import { twMerge } from 'tailwind-merge'

import { BaseButton } from './BaseButton'

type ButtonProps = ComponentPropsWithoutRef<'button'>

export const Button = ({ className, ...props }: ButtonProps) => (
	<BaseButton
		className={twMerge(
			'min-h-16 w-70 gap-3 rounded-2xl border-2 border-neutral-400 bg-white px-12 py-6 text-gray-900',
			className
		)}
		{...props}
	/>
)
