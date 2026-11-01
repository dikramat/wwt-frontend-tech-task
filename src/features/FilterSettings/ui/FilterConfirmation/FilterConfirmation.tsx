import { useTranslation } from 'react-i18next'

import { Button } from '@/shared/ui/components/Button'
import { Popup, PopupFooter, PopupHeader } from '@/shared/ui/components/Popup'

type FilterConfirmationProps = {
	onCancel: () => void
	onConfirm: () => void
}

export const FilterConfirmation = ({
	onCancel,
	onConfirm
}: FilterConfirmationProps) => {
	const { t } = useTranslation('common')

	return (
		<Popup className="gap-30 p-8 shadow-popup">
			<PopupHeader
				className="mx-0 mt-0"
				closeLabel={t('popup.close')}
				onClose={onCancel}
				showDivider={false}
				title={t('popup.confirmation.title')}
			/>
			<PopupFooter className="shrink-0 p-0">
				<div className="mx-auto flex w-fit flex-col items-center justify-center gap-4 md:h-16 md:flex-row md:gap-8">
					<Button
						className="h-16 min-h-0 w-70 border-2 border-black-grey-200 bg-white px-12 py-0 font-inter font-medium text-black-grey-500"
						onClick={onCancel}
					>
						{t('popup.confirmation.useOldFilter')}
					</Button>
					<Button
						className="h-16 min-h-0 w-70 border-0 bg-buttons-brand-200 px-17.5 py-0 font-inter font-medium text-white"
						onClick={onConfirm}
					>
						{t('popup.confirmation.applyNewFilter')}
					</Button>
				</div>
			</PopupFooter>
		</Popup>
	)
}
