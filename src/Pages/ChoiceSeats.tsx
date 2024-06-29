import { FC, useCallback, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { getBaseUrlWithRoutes } from '../services/utils/url.util';
import useFetchData from '../hooks/useFetchData';
import Wrapper from '../components/Wrapper/Wrapper';
import TicketsWidget from '../components/TicketsWidget/TicketsWidget';
import LastDirectionsWidget from '../components/LastTicketsWidget/LastDirectionsWidget';
import Loading from '../components/Loading/Loading';
import ErrorHandler from '../components/ErrorHandler/ErrorHandler';
import SeatsWidget, { SeatsWidgetItemProps } from '../components/SeatsWidget/SeatsWidget';
import { useAppSelector } from '../store/store';

const ChoiceSeats: FC = () => {
	const [retryCount, setRetryCount] = useState<number>(1);
	const { activeDirection } = useAppSelector((state) => state.ticketData);
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();
	const { id } = useParams();

	const { data, isLoading, error } = useFetchData<SeatsWidgetItemProps[]>({
		url: `${getBaseUrlWithRoutes()}/${id}/seats?${searchParams.toString()}`,
		retryCount,
	});

	const tryToLoad = useCallback(() => {
		setRetryCount(retryCount + 1);
	}, [retryCount]);

	const onChange = useCallback(
		(valueName: string, value: string | number | boolean) => {
			let timeoutId: ReturnType<typeof setTimeout> | null = null;
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			timeoutId = setTimeout(() => {
				if (String(value) === '') {
					searchParams.delete(valueName);
				} else {
					searchParams.set(valueName, String(value));
				}
				setSearchParams(searchParams);
			}, 800);
		},
		[searchParams, setSearchParams]
	);

	if (!activeDirection) {
		navigate(-1);
	}

	return (
		<Wrapper type='page'>
			{!isLoading && !!data && (
				<>
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
							endArrivalHourTo={
								searchParams.has('end_arrival_hour_to') ? Number(searchParams.get('end_arrival_hour_to')) : null
							}
						/>
						<LastDirectionsWidget />
					</aside>
					<main className='Main'>{!!data && <SeatsWidget data={data} />}</main>
				</>
			)}
			{isLoading && <Loading />}
			{!isLoading && !!error && <ErrorHandler onClick={tryToLoad} />}
		</Wrapper>
	);
};

export default ChoiceSeats;
