import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { cn } from '@bem-react/classname';
import { IconButton } from '@mui/material';

import { useAppSelector } from '../../store/store';
import ArrowRightYellow from '../Icons/ArrowRightYeallow';
import { Button } from '../Button/Button';
import TrainInfo from '../TrainInfo/TrainInfo';

import { Coach } from '../TrainInfo/VansInfo/TrainInfo-VansInfo';
import { Seat } from '../Van/Van';

import './SeatsWidget.scss';
import ArrowLeftYellow from '../Icons/ArrowLeftYellow';
import { Link } from 'react-router-dom';

export type SeatsWidgetItemProps = {
	coach: Coach;
	seats: Seat[];
};

type SeatsWidgetProps = {
	data?: SeatsWidgetItemProps[];
};

const cnSeatsWidget = cn('SeatsWidget');

const SeatsWidget: FC<SeatsWidgetProps> = ({ data }) => {
	const { activeDirection, departure } = useAppSelector((state) => state.ticketData);
	const navigate = useNavigate();

	const returnHandler = useCallback(() => {
		navigate(-1);
	}, [navigate]);

	return (
		<div className={cnSeatsWidget()}>
			<h2 className={cnSeatsWidget('Title', ['H2'])}>Выбор мест</h2>
			{!!data?.length && !!activeDirection && (
				<>
					<div className={cnSeatsWidget('ChoiceTrain')}>
						<IconButton
							className={cnSeatsWidget('ReturnIconBtn')}
							onClick={returnHandler}>
							<ArrowRightYellow fontSize='inherit' />
						</IconButton>
						<Button
							className={cnSeatsWidget('ReturnBtn')}
							onClick={returnHandler}>
							Выбрать другой поезд
						</Button>
					</div>
					<TrainInfo
						directionInfo={activeDirection.departure}
						type='departure'
						data={data}
					/>
					{!!activeDirection.arrival && (
						<>
							<div className={cnSeatsWidget('ChoiceTrain', { reverse: true })}>
								<IconButton
									className={cnSeatsWidget('ReturnIconBtn')}
									onClick={returnHandler}>
									<ArrowLeftYellow fontSize='inherit' />
								</IconButton>
								<Button
									className={cnSeatsWidget('ReturnBtn')}
									onClick={returnHandler}>
									Выбрать другой поезд
								</Button>
							</div>
							<TrainInfo
								directionInfo={activeDirection.arrival}
								type='arrival'
								data={data}
							/>
						</>
					)}
					<div className={cnSeatsWidget('Actions')}>
						{!!departure?.seats.length && (
							<Link
								className={cnSeatsWidget('ActionButton')}
								to='../passengers'>
								Далее
							</Link>
						)}
					</div>
				</>
			)}
			{!data?.length && <p className={cnSeatsWidget('Empty')}>Что-то пошло не так. Свободные места отсутствуют.</p>}
		</div>
	);
};

export default SeatsWidget;
