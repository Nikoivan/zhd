import { FC, useState } from 'react';
import { cn } from '@bem-react/classname';

import useFetchData from '../../hooks/useFetchData';
import { getLastDirectionsUrl } from '../../services/utils/url.util';

import { DirectionListItem } from '../../redux/slices/ticketSlice/ticketsSliceTypes';
import LastDirectionsWidgetItem from './Item/LastDirectionsWidget-Item';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import Loading from '../Loading/Loading';

import './LastDirectionsWidget.scss';

const cnLastDirectionsWidget = cn('LastDirectionsWidget');

const LastTicketsWidget: FC = () => {
	const [retryCount, setRetryCount] = useState<number>(1);
	const {
		data,
		isLoading,
		error: hasError,
	} = useFetchData<DirectionListItem[]>({ url: getLastDirectionsUrl(), retryCount });

	let directions: DirectionListItem[] = [];

	if (data?.length) {
		directions = data.length > 3 ? data.slice(0, 3) : data;
	}

	const retryHandler = () => {
		setRetryCount(retryCount + 1);
	};

	return (
		<div className={cnLastDirectionsWidget()}>
			<h3 className={cnLastDirectionsWidget('Title')}>Последние билеты</h3>
			{!!directions.length && (
				<ul className={cnLastDirectionsWidget('List')}>
					{directions.map((item, idx) => (
						<LastDirectionsWidgetItem
							key={idx}
							{...item}
						/>
					))}
				</ul>
			)}
			{isLoading && <Loading />}
			{!!hasError && (
				<ErrorHandler
					onClick={retryHandler}
					errorMessage={hasError}
				/>
			)}
		</div>
	);
};

export default LastTicketsWidget;
