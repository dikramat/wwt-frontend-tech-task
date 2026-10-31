import type { FilterItem } from '@/shared/api/types/Filter'
import { Button, LinkLikeButton } from '@/shared/ui/components/Button'
import { FilterSection } from '@/shared/ui/components/FilterSection'
import {
	Popup,
	PopupBody,
	PopupFooter,
	PopupHeader
} from '@/shared/ui/components/Popup'

type FilterSettingsProps = {
	closeLabel: string
	applyLabel: string
	clearLabel: string
	filterItems: FilterItem[]
	onClose: () => void
	onClear: () => void
	onOptionToggle: (filterId: string, optionId: string, checked: boolean) => void
	selectedOptions: Record<string, string[]>
	title: string
}

export const FilterSettings = ({ ...props }: FilterSettingsProps) => {
	const {
		closeLabel,
		applyLabel,
		clearLabel,
		filterItems,
		onClose,
		onClear,
		onOptionToggle,
		selectedOptions,
		title
	} = props

	return (
		<Popup>
			<PopupHeader
				closeLabel={closeLabel}
				onClose={onClose}
				title={title}
			/>
			<PopupBody className="pb-0!">
				{filterItems.map(filter => (
					<FilterSection
						key={filter.id}
						onOptionToggle={(optionId, checked) =>
							onOptionToggle(filter.id, optionId, checked)
						}
						options={filter.options}
						selectedOptionIds={selectedOptions[filter.id] ?? []}
						title={filter.name}
					/>
				))}
			</PopupBody>
			<PopupFooter className="shrink-0 px-8 pb-8">
				<div className="relative flex min-h-16 flex-col items-center justify-center gap-4 md:flex-row md:gap-0">
					<Button className="h-16 min-h-0 w-46 border-0 bg-buttons-brand-200 px-17.5 py-0 font-medium text-white">
						{applyLabel}
					</Button>
					<LinkLikeButton
						className="md:absolute md:right-0"
						onClick={onClear}
					>
						{clearLabel}
					</LinkLikeButton>
				</div>
			</PopupFooter>
		</Popup>
	)
}
