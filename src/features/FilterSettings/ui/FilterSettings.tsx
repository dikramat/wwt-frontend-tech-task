import { useTranslation } from 'react-i18next'

import type { FilterItem } from '@/shared/api/types/Filter'
import { Button, LinkLikeButton } from '@/shared/ui/components/Button'
import { Divider } from '@/shared/ui/components/Divider'
import { FilterSection } from '@/shared/ui/components/FilterSection'
import {
	Popup,
	PopupBody,
	PopupFooter,
	PopupHeader
} from '@/shared/ui/components/Popup'

type FilterSettingsProps = {
	filterItems: FilterItem[] | undefined
	onClose: () => void
}

const skeletonSections = Array.from({ length: 4 })
const skeletonOptions = Array.from({ length: 6 })

const FilterSettingsSkeleton = () => (
	<div
		aria-hidden="true"
		className="animate-pulse"
	>
		{skeletonSections.map((_, sectionIndex) => (
			<section
				className="w-full"
				key={sectionIndex}
			>
				<div className="mb-6 h-6 w-48 rounded bg-gray-200" />
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{skeletonOptions.map((__, optionIndex) => (
						<div
							className="flex min-h-6 items-center gap-4"
							key={optionIndex}
						>
							<div className="size-5 shrink-0 rounded border-2 border-gray-200 bg-gray-100" />
							<div className="h-4 w-32 rounded bg-gray-200" />
						</div>
					))}
				</div>
				<Divider className="my-6" />
			</section>
		))}
	</div>
)

export const FilterSettings = ({
	filterItems,
	onClose
}: FilterSettingsProps) => {
	const { t } = useTranslation('common')

	return (
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
								options={filter.options}
								title={filter.name}
							/>
						))
					) : (
						<FilterSettingsSkeleton />
					)}
				</PopupBody>
				<PopupFooter className="shrink-0 px-8 pb-8">
					<div className="relative flex min-h-16 flex-col items-center justify-center gap-4 md:flex-row md:gap-0">
						<Button className="h-16 min-h-0 w-46 border-0 bg-buttons-brand-200 px-17.5 py-0 font-medium text-white">
							{t('popup.apply')}
						</Button>
						<LinkLikeButton
							className="md:absolute md:right-0"
							type="reset"
						>
							{t('popup.clear')}
						</LinkLikeButton>
					</div>
				</PopupFooter>
			</form>
		</Popup>
	)
}
