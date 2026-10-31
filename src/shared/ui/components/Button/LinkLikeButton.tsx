import type { ComponentPropsWithoutRef } from 'react'

import { twMerge } from 'tailwind-merge'

import { BaseButton } from './BaseButton'

type LinkLikeButtonProps = ComponentPropsWithoutRef<'button'>

export const LinkLikeButton = ({
	className,
	...props
}: LinkLikeButtonProps) => (
	<BaseButton
		className={twMerge(
			'border-2 border-transparent bg-transparent p-0 font-inter text-base leading-none font-medium text-teal-700 underline decoration-solid underline-offset-4 active:border-2 active:border-transparent active:shadow-none active:text-teal-800',
			className
		)}
		{...props}
	/>
)
