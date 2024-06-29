import { cn } from '@bem-react/classname';
import { FC, useMemo } from 'react';
import { Seat } from '../Van';
import { getPreparedPlaces } from '../../../services/helpers/van.utils';

const cnVan = cn('Van');

const VanThirdClass: FC<{ seats: Seat[]; selected: number[]; onPlaceClick: (i: number) => void }> = ({
	seats,
	selected,
	onPlaceClick,
}) => {
	const { firstArr, secondArr } = useMemo(() => getPreparedPlaces(seats, 'third'), [seats]);

	return (
		<>
			<ul className={cnVan('List', ['List'])}>
				{firstArr.map((item, idx) => (
					<li
						className={cnVan('Room')}
						key={idx}>
						<div className={cnVan('PlaceWrap')}>
							<span
								className={cnVan('Place', {
									secondClass: true,
									available: item[0].available,
									selected: !!selected.length && selected.includes(item[0].index),
								})}
								onClick={() => {
									if (!item[0].available) {
										return;
									}
									onPlaceClick(item[0].index);
								}}>
								<span className={cnVan('PlaceNumber')}>{item[0].index}</span>
							</span>
							<span
								className={cnVan('Place', {
									secondClass: true,
									available: item[1].available,
									selected: !!selected.length && selected.includes(item[1].index),
								})}
								onClick={() => {
									if (!item[1].available) {
										return;
									}
									onPlaceClick(item[1].index);
								}}>
								<span className={cnVan('PlaceNumber')}>{item[1].index}</span>
							</span>
						</div>
						<div className={cnVan('PlaceWrap')}>
							<span
								className={cnVan('Place', {
									secondClass: true,
									available: item[2].available,
									selected: !!selected.length && selected.includes(item[2].index),
								})}
								onClick={() => {
									if (!item[2].available) {
										return;
									}
									onPlaceClick(item[2].index);
								}}>
								<span className={cnVan('PlaceNumber')}>{item[2].index}</span>
							</span>
							<span
								className={cnVan('Place', {
									secondClass: true,
									available: item[3].available,
									selected: !!selected.length && selected.includes(item[3].index),
								})}
								onClick={() => {
									if (!item[3].available) {
										return;
									}
									onPlaceClick(item[3].index);
								}}>
								<span className={cnVan('PlaceNumber')}>{item[3].index}</span>
							</span>
						</div>
					</li>
				))}
			</ul>
			<ul className={cnVan('List', { type: 'side' })}>
				{secondArr.map((item, idx) => (
					<li
						className={cnVan('Room')}
						key={idx}>
						<div className={cnVan('PlaceWrap', { type: 'side' })}>
							<span
								className={cnVan('Place', {
									available: item[0].available,
									selected: !!selected.length && selected.includes(item[0].index),
								})}
								onClick={() => {
									if (!item[0].available) {
										return;
									}
									onPlaceClick(item[0].index);
								}}>
								<span className={cnVan('PlaceNumber')}>{item[0].index}</span>
							</span>
							<span
								className={cnVan('Place', {
									available: item[1].available,
									selected: !!selected.length && selected.includes(item[1].index),
								})}
								onClick={() => {
									if (!item[1].available) {
										return;
									}
									onPlaceClick(item[1].index);
								}}>
								<span className={cnVan('PlaceNumber')}>{item[1].index}</span>
							</span>
						</div>
					</li>
				))}
			</ul>
		</>
	);
};

export default VanThirdClass;
