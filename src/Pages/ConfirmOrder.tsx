import { FC } from 'react';

import Wrapper from '../components/Wrapper/Wrapper';
import TripDetails from '../components/TripDetails/TripDetails';
import ConfirmWidget from '../components/ConfirmWidget/ConfirmWidget';

const ConfirmOrder: FC = () => (
	<Wrapper type='page'>
		<aside className='Aside'>
			<TripDetails />
		</aside>
		<main className='Main'>
			<ConfirmWidget />
		</main>
	</Wrapper>
);

export default ConfirmOrder;
