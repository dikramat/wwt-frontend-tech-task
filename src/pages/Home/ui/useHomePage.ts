import { useState } from 'react'

import { useFilterItemsQuery } from '@/shared/api/queries'
import { useFilterStore } from '@/shared/store/useFilterStore'

export const useHomePage = () => {
	const { data: filterItems } = useFilterItemsQuery()
	const appliedFilters = useFilterStore(state => state.appliedFilters)
	const [isFilterSettingsOpen, setIsFilterSettingsOpen] = useState(false)

	const openFilterSettings = () => setIsFilterSettingsOpen(true)

	const closeFilterSettings = () => setIsFilterSettingsOpen(false)

	return {
		filterItems,
		appliedFilters,
		isFilterSettingsOpen,
		openFilterSettings,
		closeFilterSettings
	}
}
