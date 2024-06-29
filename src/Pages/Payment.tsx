import { FC } from 'react';

import Wrapper from '../components/Wrapper/Wrapper';
import TripDetails from '../components/TripDetails/TripDetails';
import PaymentWidget from '../components/PaymentWidget/PaymentWidget';

const Payment: FC = () => (
	<Wrapper type='page'>
		<aside className='Aside'>
			<TripDetails />
		</aside>
		<main className='Main'>
			<PaymentWidget />
		</main>
	</Wrapper>
);

export default Payment;
