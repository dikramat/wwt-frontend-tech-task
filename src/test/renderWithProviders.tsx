import type { PropsWithChildren, ReactElement } from 'react'
import { I18nextProvider } from 'react-i18next'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import i18n from 'i18next'

import '@/shared/i18n'

export const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false
			}
		}
	})

export const renderWithProviders = (
	ui: ReactElement,
	queryClient = createTestQueryClient()
) => {
	const Wrapper = ({ children }: PropsWithChildren) => (
		<I18nextProvider i18n={i18n}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</I18nextProvider>
	)

	return {
		...render(ui, { wrapper: Wrapper }),
		queryClient
	}
}
