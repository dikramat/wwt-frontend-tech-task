import { useContext } from 'react'

import { twMerge } from 'tailwind-merge'

import { IconButton } from '@/shared/ui/components/Button'
import { Divider } from '@/shared/ui/components/Divider'
import { CloseIcon } from '@/shared/ui/icons'

import { PopupContext } from './PopupContext'

type PopupHeaderProps = {
	title: string
	closeLabel: string
	onClose: () => void
	className?: string
	showDivider?: boolean
}

export const PopupHeader = ({
	title,
	closeLabel,
	onClose,
	className,
	showDivider = true
}: PopupHeaderProps) => {
	const titleId = useContext(PopupContext)

	return (
		<>
			<header
				className={twMerge(
					'relative mx-8 mt-10 flex h-12 items-center justify-center',
					className
				)}
			>
				<h2
					className="font-inter text-4xl leading-10 font-medium tracking-normal text-black-grey-500"
					id={titleId ?? undefined}
				>
					{title}
				</h2>
				<IconButton
					aria-label={closeLabel}
					className="absolute right-0"
					icon={<CloseIcon />}
					onClick={onClose}
				/>
			</header>
			{showDivider && (
				<div className="mx-8">
					<Divider className="my-6" />
				</div>
			)}
		</>
	)
}
