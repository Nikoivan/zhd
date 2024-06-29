import { FC } from 'react';
import { cn } from '@bem-react/classname';
import Rub from '../../Icons/Rub';
import { numberWithSpaces } from '../../../services/utils/strings.util';

type TrainsWidgetPlaceItemProps = {
	title: string;
	freePlaces: number;
	bottomPrice: number;
};

const cnTrainsWidget = cn('TrainsWidget');

const TrainsWidgetPlaceItem: FC<TrainsWidgetPlaceItemProps> = ({ title, freePlaces, bottomPrice }) => {
	return (
		<div className={cnTrainsWidget('PlaceItem')}>
			<span className={cnTrainsWidget('PlaceTitle')}>{title}</span>
			<span className={cnTrainsWidget('FreePlaces')}>{freePlaces}</span>
			<span className={cnTrainsWidget('PlaceText')}>от</span>
			<div className={cnTrainsWidget('SubWrap')}>
				<span className={cnTrainsWidget('Price', ['H3', 'Bold'])}>{numberWithSpaces(bottomPrice)}</span>
				<Rub fontSize='small' />
			</div>
		</div>
	);
};

export default TrainsWidgetPlaceItem;
