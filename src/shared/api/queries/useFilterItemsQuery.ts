import { useQuery } from '@tanstack/react-query'

import type { FilterItem } from '@/shared/api/types/Filter'
import {
	SECOND_IN_MS,
	THIRTY_MINUTES_IN_MS,
	THIRTY_SECONDS_IN_MS
} from '@/shared/constants/time'
import filterData from '@/shared/temp/filterData.json'

const getFilterItems = async (): Promise<FilterItem[]> =>
	filterData.filterItems as FilterItem[]

export const useFilterItemsQuery = () =>
	useQuery({
		queryKey: ['filterItems'],
		queryFn: getFilterItems,
		staleTime: THIRTY_MINUTES_IN_MS,
		gcTime: THIRTY_MINUTES_IN_MS,
		retry: true,
		retryDelay: attemptIndex =>
			Math.min(SECOND_IN_MS * 2 ** attemptIndex, THIRTY_SECONDS_IN_MS)
	})
