import { useContext } from 'react'

import { IconButton } from '@/shared/ui/components/Button'
import { Divider } from '@/shared/ui/components/Divider'
import { CloseIcon } from '@/shared/ui/icons'

import { PopupContext } from './PopupContext'

interface PopupHeaderProps {
	title: string
	closeLabel: string
	onClose: () => void
}

export const PopupHeader = ({
	title,
	closeLabel,
	onClose
}: PopupHeaderProps) => {
	const titleId = useContext(PopupContext)

	return (
		<>
			<header className="relative mx-8 mt-10 flex h-12 items-center justify-center">
				<h2
					className="font-sans text-4xl leading-10 font-medium tracking-normal text-gray-700"
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
			<div className="mx-8">
				<Divider className="my-6" />
			</div>
		</>
	)
}
