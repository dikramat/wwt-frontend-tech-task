import type { FilterChooseOption } from '@/shared/api/types/Filter'
import { Checkbox } from '@/shared/ui/components/Checkbox'
import { Divider } from '@/shared/ui/components/Divider'

type FilterSectionProps = {
	title: string
	options: FilterChooseOption[]
}

export const FilterSection = ({ title, options }: FilterSectionProps) => (
	<section className="w-full">
		<div className="flex flex-col gap-6">
			<h2 className="font-inter text-2xl leading-6 font-medium tracking-normal text-black-grey-500">
				{title}
			</h2>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{options.map(option => (
					<Checkbox
						key={option.id}
						label={option.name}
					/>
				))}
			</div>
		</div>
		<Divider className="my-6" />
	</section>
)
