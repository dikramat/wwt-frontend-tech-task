import { QueryClient } from '@tanstack/react-query'
import { describe, expect, it } from 'vitest'

import { queryClient } from './query'

describe('shared query client', () => {
	it('exports a React Query client instance', () => {
		expect(queryClient).toBeInstanceOf(QueryClient)
	})
})
