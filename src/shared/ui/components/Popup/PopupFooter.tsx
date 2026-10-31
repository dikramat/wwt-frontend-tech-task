import type { ComponentPropsWithoutRef } from 'react'

type PopupFooterProps = ComponentPropsWithoutRef<'footer'>

export const PopupFooter = ({
	className,
	children,
	...props
}: PopupFooterProps) => (
	<footer
		className={className}
		{...props}
	>
		{children}
	</footer>
)
