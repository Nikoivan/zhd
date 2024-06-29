import { FC } from 'react';
import Wrapper from '../components/Wrapper/Wrapper';
import TripDetails from '../components/TripDetails/TripDetails';
import PassengersList from '../components/PassengersList/PassengersList';

const Passengers: FC = () => (
	<Wrapper type='page'>
		<aside className='Aside'>
			<TripDetails />
		</aside>
		<main className='Main'>
			<PassengersList />
		</main>
	</Wrapper>
);

export default Passengers;
