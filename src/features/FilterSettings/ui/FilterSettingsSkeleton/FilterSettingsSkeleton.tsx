import { Divider } from '@/shared/ui/components/Divider'

const skeletonSections = Array.from({ length: 4 })
const skeletonOptions = Array.from({ length: 6 })

export const FilterSettingsSkeleton = () => (
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
