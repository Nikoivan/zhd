import { FC, useMemo } from 'react';
import { cn } from '@bem-react/classname';

import { getPreparedPlaces } from '../../../services/helpers/van.utils';
import { Seat } from '../Van';

const cnVan = cn('Van');

const VanFourthClass: FC<{ seats: Seat[]; selected: number[]; onPlaceClick: (i: number) => void }> = ({
	seats,
	selected,
	onPlaceClick,
}) => {
	const { firstArr, secondArr } = useMemo(() => getPreparedPlaces(seats, 'fourth'), [seats]);

	return (
		<>
			<ul className={cnVan('List', { fourthClass: true }, ['List'])}>
				{firstArr.map((items, idx) => (
					<li
						className={cnVan('PlaceWrap', { fourthClass: true })}
						key={idx}>
						<span
							className={cnVan('Place', {
								fourthClass: true,
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
						<span
							className={cnVan('Place', {
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
					</li>
				))}
			</ul>
			<ul className={cnVan('List', { fourthClass: true, second: true })}>
				{secondArr.map((items, idx) => (
					<li
						className={cnVan('PlaceWrap', { fourthClass: true })}
						key={idx}>
						<span
							className={cnVan('Place', {
								empty: items[0].index === 0,
								fourthClass: true,
								available: items[0].index !== 0 && items[0].available,
								selected: !!selected.length && selected.includes(items[0].index),
							})}
							onClick={() => {
								if (!items[0].available) {
									return;
								}
								onPlaceClick(items[0].index);
							}}>
							<span className={cnVan('PlaceNumber')}>{items[0].index !== 0 ? items[0].index : ''}</span>
						</span>
						<span
							className={cnVan('Place', {
								fourthClass: true,
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
					</li>
				))}
			</ul>
		</>
	);
};

export default VanFourthClass;
