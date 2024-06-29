import { cn } from '@bem-react/classname';
import { FC, useMemo } from 'react';

import { Seat } from '../Van';
import { getPreparedPlaces } from '../../../services/helpers/van.utils';

const cnVan = cn('Van');

const VanFirstClass: FC<{ seats: Seat[]; selected: number[]; onPlaceClick: (i: number) => void }> = ({
	seats,
	selected,
	onPlaceClick,
}) => {
	const { firstArr } = useMemo(() => getPreparedPlaces(seats, 'first'), [seats]);

	console.log(firstArr);

	return (
		<ul className={cnVan('List', ['List'])}>
			{firstArr.map((items, idx) => (
				<li
					className={cnVan('Room')}
					key={idx}>
					<div className={cnVan('PlaceWrap')}>
						<span
							className={cnVan('Place', {
								firstClass: true,
								available: items[0].available,
								selected: !!selected.length && selected.includes(items[0].index),
							})}
							onClick={() => {
								if (!items[0].available) {
									return;
								}
								onPlaceClick(items[0].index);
							}}>
							<span className={cnVan('PlaceNumber')}>{items[0].index}</span>
						</span>
					</div>
					<div className={cnVan('PlaceWrap')}>
						<span
							className={cnVan('Place', {
								firstClass: true,
								available: items[1].available,
								selected: !!selected.length && selected.includes(items[1].index),
							})}
							onClick={() => {
								if (!items[1].available) {
									return;
								}
								onPlaceClick(items[1].index);
							}}>
							<span className={cnVan('PlaceNumber')}>{items[1].index}</span>
						</span>
					</div>
				</li>
			))}
		</ul>
	);
};
export default VanFirstClass;
