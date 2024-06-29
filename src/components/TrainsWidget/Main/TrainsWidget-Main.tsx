import { cn } from '@bem-react/classname';
import { FC } from 'react';

import TrainsWidgetListItem from '../ListItem/TrainsWidget-ListItem';
import { DirectionListItem } from '../../../redux/slices/ticketSlice/ticketsSliceTypes';

type TrainsWidgetMainProps = {
	directionsList: DirectionListItem[];
};

const cnTrainsWidget = cn('TrainsWidget');

const TrainsWidgetMain: FC<TrainsWidgetMainProps> = ({ directionsList }) => (
	<div className={cnTrainsWidget('Main')}>
		<ul className={cnTrainsWidget('List')}>
			{directionsList.map((direction, idx) => (
				<TrainsWidgetListItem
					key={idx}
					{...direction}
				/>
			))}
		</ul>
	</div>
);

export default TrainsWidgetMain;
