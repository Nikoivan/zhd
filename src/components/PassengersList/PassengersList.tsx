import { FC, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { cn } from '@bem-react/classname';

import { useAppSelector } from '../../store/store';
import PassengersListItem from './Item/PassengersList-Item';
import { Button } from '../Button/Button';

import './PassengersList.scss';

const cnPassengersList = cn('PassengersList');

const PassengersList: FC = () => {
	const [focusedIndex, setIndex] = useState<number>(0);
	const { activeDirection, departure } = useAppSelector((state) => state.ticketData);
	const navigate = useNavigate();

	const enabled = useMemo(
		() => !!departure?.seats.length && departure?.seats.every((item) => item.valid),
		[departure?.seats]
	);

	const handleIndexChange = useCallback(() => {
		if (!departure || departure?.seats.length === 0 || departure?.seats.length === focusedIndex + 1) return;

		setIndex(focusedIndex + 1);
	}, [departure, focusedIndex]);

	return (
		<>
			{!!departure?.seats.length && (
				<ul className={cnPassengersList(null, ['List'])}>
					{departure.seats.map((item, idx) => (
						<PassengersListItem
							{...item}
							num={idx + 1}
							inFocus={focusedIndex === idx || undefined}
							key={idx}
							handleNextIndex={handleIndexChange}
						/>
					))}
				</ul>
			)}
			<div className={cnPassengersList('AddPass')}>
				<span className={cnPassengersList('AddPassAnno')}>Добавить пассажира</span>
				<Button
					className={cnPassengersList('AddPassBtn')}
					onClick={() => {
						navigate(`../seats${activeDirection ? '/' + activeDirection.departure._id : ''}`);
					}}
					supraType='withoutAll'>
					+
				</Button>
			</div>
			<div className={cnPassengersList('Action')}>
				<Button
					className={cnPassengersList('ActionBtn', {
						disabled: !enabled,
					})}
					onClick={() => {
						if (!enabled) return;
						navigate('../payment');
					}}>
					Далее
				</Button>
			</div>
		</>
	);
};

export default PassengersList;
