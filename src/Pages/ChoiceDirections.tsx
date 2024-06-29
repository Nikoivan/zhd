import { FC, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import useFetchData from '../hooks/useFetchData';
import { getBaseUrlWithRoutes } from '../services/utils/url.util';
import Wrapper from '../components/Wrapper/Wrapper';
import TicketsWidget from '../components/TicketsWidget/TicketsWidget';
import Loading from '../components/Loading/Loading';
import LastDirectionsWidget from '../components/LastTicketsWidget/LastDirectionsWidget';
import { DirectionListItem } from '../redux/slices/ticketSlice/ticketsSliceTypes';
import ErrorHandler from '../components/ErrorHandler/ErrorHandler';
import TrainsWidget from '../components/TrainsWidget/TrainsWidget';

const ChoiceDirections: FC = () => {
	const [retryCount, setRetryCount] = useState<number>(1);
	const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);
	const [searchParams, setSearchParams] = useSearchParams();

	const { data, isLoading, error } = useFetchData<{ total_count: number; items: DirectionListItem[] }>({
		url: `${getBaseUrlWithRoutes()}?${searchParams.toString()}`,
		retryCount,
	});

	const tryToLoad = useCallback(() => {
		setRetryCount(retryCount + 1);
	}, [retryCount]);

	const onChange = useCallback((valueName: string, value: string | number | boolean) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		setTimeoutId(
			setTimeout(() => {
				if (String(value) === '') {
					searchParams.delete(valueName);
				} else {
					searchParams.set(valueName, String(value));
				}
				setSearchParams(searchParams);
			}, 800)
		);
	}, []);

	return (
		<Wrapper type='page'>
			<aside className='Aside'>
				<TicketsWidget
					onChange={onChange}
					dateStart={searchParams.get('date_start')}
					dateEnd={searchParams.get('date_end')}
					priceFrom={searchParams.has('price_from') ? Number(searchParams.get('price_from')) : null}
					priceTo={searchParams.has('price_to') ? Number(searchParams.get('price_to')) : null}
					startDepartureHourFrom={
						searchParams.has('start_departure_hour_from') ? Number(searchParams.get('start_departure_hour_from')) : null
					}
					startDepartureHourTo={
						searchParams.has('start_departure_hour_to') ? Number(searchParams.get('start_departure_hour_to')) : null
					}
					startArrivalHourFrom={
						searchParams.has('start_arrival_hour_from') ? Number(searchParams.get('start_arrival_hour_from')) : null
					}
					startArrivalHourTo={
						searchParams.has('start_arrival_hour_to') ? Number(searchParams.get('start_arrival_hour_to')) : null
					}
					endDepartureHourFrom={
						searchParams.has('end_departure_hour_from') ? Number(searchParams.get('end_departure_hour_from')) : null
					}
					endDepartureHourTo={
						searchParams.has('end_departure_hour_to') ? Number(searchParams.get('end_departure_hour_to')) : null
					}
					endArrivalHourFrom={
						searchParams.has('end_arrival_hour_from') ? Number(searchParams.get('end_arrival_hour_from')) : null
					}
					endArrivalHourTo={searchParams.has('end_arrival_hour_to') ? Number(searchParams.get('end_arrival_hour_to')) : null}
				/>
				<LastDirectionsWidget />
			</aside>
			{!isLoading && (
				<main className='Main'>
					{!isLoading && (
						<TrainsWidget
							data={data}
							onChange={onChange}
							limit={searchParams.has('limit') ? Number(searchParams.get('limit')) : null}
							offset={searchParams.has('offset') ? Number(searchParams.get('offset')) : null}
							sort={searchParams.get('sort')}
						/>
					)}
				</main>
			)}
			{isLoading && <Loading />}
			{!isLoading && !!error && <ErrorHandler onClick={tryToLoad} />}
		</Wrapper>
	);
};

export default ChoiceDirections;
