import { FC } from 'react';
import { cn } from '@bem-react/classname';

import TrainsWidgetCount from '../Count/TrainsWidget-Count';
import TrainsWidgetSorting from '../Sorting/TrainsWidget-Sorting';
import TrainsWidgetFilter from '../Filter/TrainsWidget-Filter';

import { SortValues } from '../../../redux/slices/ticketSlice/ticketsSliceTypes';
import { isSortValues } from '../../../services/typeGuards/typeGuasrds';

type TrainsWidgetHeaderProps = {
	directionsCount: number;
	sort: string | null;
	limit: number | null;
	onChange(valueName: string, value: string | number | boolean): void;
};

const cnTrainsWidget = cn('TrainsWidget');

const TrainsWidgetHeader: FC<TrainsWidgetHeaderProps> = ({ directionsCount, sort, limit, onChange }) => {
	const onSelectSortValue = (sortValue: SortValues) => {
		onChange('sort', sortValue);
	};

	return (
		<div className={cnTrainsWidget('Header')}>
			<TrainsWidgetCount foundCount={directionsCount} />
			<TrainsWidgetSorting
				activeValue={sort && isSortValues(sort) ? sort : 'date'}
				onSelect={onSelectSortValue}
			/>
			<TrainsWidgetFilter
				activeValue={limit}
				onChange={onChange}
			/>
		</div>
	);
};

export default TrainsWidgetHeader;
