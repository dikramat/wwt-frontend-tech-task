import { useState } from 'react'

import { useFilterItemsQuery } from '@/shared/api/queries'

export const useHomePage = () => {
	const { data: filterItems } = useFilterItemsQuery()
	const [isFilterSettingsOpen, setIsFilterSettingsOpen] = useState(false)

	const openFilterSettings = () => setIsFilterSettingsOpen(true)

	const closeFilterSettings = () => setIsFilterSettingsOpen(false)

	return {
		filterItems,
		isFilterSettingsOpen,
		openFilterSettings,
		closeFilterSettings
	}
}
