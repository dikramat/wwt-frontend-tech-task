import type { ComponentPropsWithoutRef } from 'react'

import { twMerge } from 'tailwind-merge'

type DividerProps = ComponentPropsWithoutRef<'hr'>

export const Divider = ({ className = '', ...props }: DividerProps) => (
	<hr
		className={twMerge(
			'w-full border-0 border-t-2 border-black-grey-200',
			className
		)}
		{...props}
	/>
)
