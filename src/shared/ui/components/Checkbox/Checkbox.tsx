import { type ComponentPropsWithoutRef, type ReactNode, useId } from 'react'

import { twMerge } from 'tailwind-merge'

type CheckboxProps = Omit<
	ComponentPropsWithoutRef<'input'>,
	'className' | 'id' | 'type'
> & {
	className?: string
	id?: string
	inputClassName?: string
	label: ReactNode
	labelClassName?: string
}

export const Checkbox = ({
	className,
	id,
	inputClassName,
	label,
	labelClassName,
	...props
}: CheckboxProps) => {
	const generatedId = useId()
	const inputId = id ?? generatedId

	return (
		<label className={twMerge('flex min-h-6 items-center gap-4', className)}>
			<input
				className={twMerge(
					'size-5 shrink-0 border-2 border-black-grey-500 bg-white accent-black-grey-500',
					inputClassName
				)}
				id={inputId}
				type="checkbox"
				{...props}
			/>
			<span
				className={twMerge(
					'font-inter text-base leading-4 font-normal tracking-normal text-black',
					labelClassName
				)}
			>
				{label}
			</span>
		</label>
	)
}
