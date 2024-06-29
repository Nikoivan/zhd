import { FC } from 'react';

import StepsBarItem from './Item/StepsBar-Item';

import './StepsBar.scss';
import { useLocation } from 'react-router';
import getActiveBarsCount from '../../services/utils/stepBar.utils';

const steps = [
	{ count: 1, title: 'Билеты' },
	{ count: 2, title: 'Пассажиры' },
	{ count: 3, title: 'Оплата' },
	{ count: 4, title: 'Проверка', withoutArrow: true },
];

const StepsBar: FC = () => {
	const location = useLocation();
	const count = getActiveBarsCount(location.pathname);

	return (
		<ul className='List StepsBar'>
			{steps.map((step, idx) => (
				<StepsBarItem
					key={idx}
					idx={idx}
					{...step}
					isActive={idx < count}
				/>
			))}
		</ul>
	);
};

export default StepsBar;
