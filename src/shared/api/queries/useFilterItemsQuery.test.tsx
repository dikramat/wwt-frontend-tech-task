import type { PropsWithChildren } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FilterType } from '@/shared/api/types/Filter'

import { useFilterItemsQuery } from './useFilterItemsQuery'

describe('useFilterItemsQuery', () => {
	it('loads the filter definitions from the local JSON through React Query', async () => {
		const queryClient = new QueryClient({
			defaultOptions: { queries: { retry: false } }
		})
		const wrapper = ({ children }: PropsWithChildren) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		)

		const { result, unmount } = renderHook(() => useFilterItemsQuery(), {
			wrapper
		})

		await waitFor(() => expect(result.current.data?.length).toBeGreaterThan(0))
		expect(result.current.data?.[0]).toEqual(
			expect.objectContaining({
				id: expect.any(String),
				name: expect.any(String),
				type: FilterType.OPTION,
				options: expect.any(Array)
			})
		)

		const query = queryClient
			.getQueryCache()
			.find({ queryKey: ['filterItems'] })
		expect(Reflect.get(query?.options ?? {}, 'staleTime')).toBe(30 * 60 * 1000)
		expect(query?.options.gcTime).toBe(30 * 60 * 1000)
		expect(query?.options.retry).toBe(true)
		const retryDelay = query?.options.retryDelay
		expect(typeof retryDelay).toBe('function')
		if (typeof retryDelay !== 'function') {
			throw new Error('Expected retryDelay to be a function')
		}
		expect(retryDelay(0, new Error('temporary failure'))).toBe(1000)
		expect(retryDelay(10, new Error('temporary failure'))).toBe(30000)

		unmount()
		queryClient.clear()
	})
})
