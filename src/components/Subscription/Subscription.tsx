import { FC } from 'react';

import SubscriptionForm from './Form/Subscription-Form';

import './Subscription.scss';

export type SubscriptionProps = {
	title: string;
};

const Subscription: FC<SubscriptionProps> = ({ title }) => (
	<div className='Subscription'>
		<h4 className='Subscription-Title'>{title}</h4>
		<SubscriptionForm />
	</div>
);

export default Subscription;
