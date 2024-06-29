import { cn } from '@bem-react/classname';
import { FC } from 'react';

import Select, { OptionProps } from '../../Select/Select';
import { SortValues } from '../../../redux/slices/ticketSlice/ticketsSliceTypes';

const options: OptionProps[] = [
	{ value: 'date', title: 'времени' },
	{ value: 'price', title: 'стоимости' },
	{ value: 'duration', title: 'длительности' },
];

export type TrainsWidgetSortingProps = {
	activeValue: SortValues;
	onSelect(valueName: SortValues): void;
};

const cnTrainsWidget = cn('TrainsWidget');

const TrainsWidgetSorting: FC<TrainsWidgetSortingProps> = ({ activeValue, onSelect }) => (
	<div className={cnTrainsWidget('Sorting')}>
		сортировать по:
		<Select
			className={cnTrainsWidget('Select')}
			options={options}
			activeValue={activeValue}
			onSelect={onSelect}
		/>
	</div>
);

export default TrainsWidgetSorting;
