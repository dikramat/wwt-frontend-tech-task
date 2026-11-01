import { useTranslation } from 'react-i18next'

import type { FilterItem } from '@/shared/api/types/Filter'
import { Button, LinkLikeButton } from '@/shared/ui/components/Button'
import { FilterSection } from '@/shared/ui/components/FilterSection'
import {
	Popup,
	PopupBody,
	PopupFooter,
	PopupHeader
} from '@/shared/ui/components/Popup'

import { FilterConfirmation } from '../FilterConfirmation'
import { FilterSettingsSkeleton } from '../FilterSettingsSkeleton'
import { useFilterSettings } from './useFilterSettings'

type FilterSettingsProps = {
	filterItems: FilterItem[] | undefined
	onClose: () => void
}

export const FilterSettings = ({
	filterItems,
	onClose
}: FilterSettingsProps) => {
	const { t } = useTranslation('common')
	const {
		draftFilters,
		isConfirmationOpen,
		toggleOption,
		clearDraftFilters,
		requestConfirmation,
		cancelConfirmation,
		confirmFilters
	} = useFilterSettings(onClose)

	return (
		<>
			<Popup>
				<PopupHeader
					closeLabel={t('popup.close')}
					onClose={onClose}
					title={t('popup.filters')}
				/>
				<form className="flex min-h-0 flex-1 flex-col overflow-hidden">
					<PopupBody
						aria-busy={!filterItems}
						className="pb-0!"
					>
						{filterItems ? (
							filterItems.map(filter => (
								<FilterSection
									key={filter.id}
									onOptionToggle={(optionId, checked) =>
										toggleOption(filter, optionId, checked)
									}
									options={filter.options}
									selectedOptionIds={
										draftFilters.find(item => item.id === filter.id)
											?.optionsIds ?? []
									}
									title={filter.name}
								/>
							))
						) : (
							<FilterSettingsSkeleton />
						)}
					</PopupBody>
					<PopupFooter className="shrink-0 px-8 pb-8">
						<div className="relative flex min-h-16 flex-col items-center justify-center gap-4 md:flex-row md:gap-0">
							<Button
								disabled={!filterItems}
								onClick={requestConfirmation}
								className="h-16 min-h-0 w-46 border-0 bg-buttons-brand-200 px-17.5 py-0 font-medium text-white"
							>
								{t('popup.apply')}
							</Button>
							<LinkLikeButton
								className="md:absolute md:right-0"
								disabled={!filterItems}
								onClick={clearDraftFilters}
								type="button"
							>
								{t('popup.clear')}
							</LinkLikeButton>
						</div>
					</PopupFooter>
				</form>
			</Popup>
			{isConfirmationOpen && (
				<FilterConfirmation
					onCancel={cancelConfirmation}
					onConfirm={confirmFilters}
				/>
			)}
		</>
	)
}
