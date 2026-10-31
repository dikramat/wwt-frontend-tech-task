import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import type { FilterItem } from '@/shared/api/types/Filter'
import filterData from '@/shared/temp/filterData.json'
import { Button } from '@/shared/ui/components/Button'

import { FilterSettings } from './FilterSettings'

export const App = () => {
	const { t } = useTranslation('common')
	const [isFilterSettingOpen, setIsFilterSettingOpen] = useState(false)
	const [selectedOptions, setSelectedOptions] = useState<
		Record<string, string[]>
	>({})
	const filterItems = filterData.filterItems as FilterItem[]

	const toggleOption = (
		filterId: string,
		optionId: string,
		checked: boolean
	) => {
		setSelectedOptions(current => {
			const currentIds = current[filterId] ?? []
			const nextIds = checked
				? [...new Set([...currentIds, optionId])]
				: currentIds.filter(id => id !== optionId)

			return { ...current, [filterId]: nextIds }
		})
	}

	return (
		<main className="flex min-h-dvh flex-col items-center justify-center gap-6 p-4">
			<h1 className="text-center text-4xl text-gray-600 sm:text-6xl">
				{t('home.title')}
			</h1>
			<Button
				className="min-h-0 w-auto px-6 py-3"
				onClick={() => setIsFilterSettingOpen(true)}
			>
				{t('home.openFilters')}
			</Button>
			{isFilterSettingOpen && (
				<FilterSettings
					applyLabel={t('popup.apply')}
					closeLabel={t('popup.close')}
					clearLabel={t('popup.clear')}
					filterItems={filterItems}
					onClear={() => setSelectedOptions({})}
					onClose={() => setIsFilterSettingOpen(false)}
					onOptionToggle={toggleOption}
					selectedOptions={selectedOptions}
					title={t('popup.filters')}
				/>
			)}
		</main>
	)
}
