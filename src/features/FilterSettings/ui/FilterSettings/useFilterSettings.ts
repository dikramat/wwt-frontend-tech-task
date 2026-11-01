import { useState } from 'react'

import type { FilterItem } from '@/shared/api/types/Filter'
import type { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'
import { useFilterStore } from '@/shared/store/useFilterStore'

export const useFilterSettings = (onClose: () => void) => {
	const appliedFilters = useFilterStore(state => state.appliedFilters)
	const setAppliedFilters = useFilterStore(state => state.setAppliedFilters)
	const [draftFilters, setDraftFilters] =
		useState<SearchRequestFilter>(appliedFilters)
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)

	const toggleOption = (
		filter: FilterItem,
		optionId: string,
		checked: boolean
	) => {
		setDraftFilters(current => {
			const currentFilter = current.find(item => item.id === filter.id)
			const currentOptionIds = currentFilter?.optionsIds ?? []
			const nextOptionIds = checked
				? [...new Set([...currentOptionIds, optionId])]
				: currentOptionIds.filter(id => id !== optionId)
			const remainingFilters = current.filter(item => item.id !== filter.id)

			if (nextOptionIds.length === 0) {
				return remainingFilters
			}

			return [
				...remainingFilters,
				{ id: filter.id, type: filter.type, optionsIds: nextOptionIds }
			]
		})
	}

	const clearDraftFilters = () => setDraftFilters([])
	const requestConfirmation = () => setIsConfirmationOpen(true)
	const cancelConfirmation = () => setIsConfirmationOpen(false)

	const confirmFilters = () => {
		setAppliedFilters(draftFilters)
		setIsConfirmationOpen(false)
		onClose()
	}

	return {
		draftFilters,
		isConfirmationOpen,
		toggleOption,
		clearDraftFilters,
		requestConfirmation,
		cancelConfirmation,
		confirmFilters
	}
}
