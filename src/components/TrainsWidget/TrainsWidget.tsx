import { cn } from '@bem-react/classname';
import { FC } from 'react';

import TrainsWidgetHeader from './Header/TrainsWidget-Header';
import TrainsWidgetMain from './Main/TrainsWidget-Main';
import { DirectionListItem } from '../../redux/slices/ticketSlice/ticketsSliceTypes';
import TrainsWidgetFooter from './Footer/TrainsWidget-Footer';

import './TrainsWidget.scss';

export type TrainsWidgetProps = {
	limit: number | null;
	sort: string | null;
	offset: number | null;
	data?: { total_count: number; items: DirectionListItem[] };
	onChange: (valueName: string, value: string | number | boolean) => void;
};

const cnTrainsWidget = cn('TrainsWidget');

const TrainsWidget: FC<TrainsWidgetProps> = ({ data, limit, sort, offset, onChange }) => (
	<>
		{!!data?.items?.length && (
			<div className={cnTrainsWidget()}>
				<TrainsWidgetHeader
					directionsCount={data.total_count}
					limit={limit}
					onChange={onChange}
					sort={sort}
				/>
				<TrainsWidgetMain directionsList={data.items} />
				<TrainsWidgetFooter
					urlLimit={limit}
					urlOffset={offset}
					totalCount={data.total_count}
					onChange={onChange}
				/>
			</div>
		)}
		{!data?.items?.length && (
			<p className={cnTrainsWidget('Empty')}>По вашему запросу ничего не найдено. Попробуйте изменить параметры запроса</p>
		)}
	</>
);

export default TrainsWidget;
