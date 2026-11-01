import { useTranslation } from 'node_modules/react-i18next'

import { FilterSettings } from '@/features/FilterSettings'
import { Button } from '@/shared/ui/components/Button'

import { useHomePage } from './useHomePage'

export const App = () => {
	const { t } = useTranslation('common')

	const {
		filterItems,
		isFilterSettingsOpen,
		openFilterSettings,
		closeFilterSettings
	} = useHomePage()

	return (
		<main className="flex min-h-dvh flex-col items-center justify-center gap-6 p-4">
			<h1 className="text-center text-4xl text-gray-600 sm:text-6xl">
				{t('home.title')}
			</h1>
			<Button
				className="min-h-0 w-auto px-6 py-3"
				onClick={openFilterSettings}
			>
				{t('home.openFilters')}
			</Button>
			{isFilterSettingsOpen && (
				<FilterSettings
					filterItems={filterItems}
					onClose={closeFilterSettings}
				/>
			)}
		</main>
	)
}
