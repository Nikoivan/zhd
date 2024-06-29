import { cn } from '@bem-react/classname';
import { FC } from 'react';
import { numberWithSpaces } from '../../../services/utils/strings.util';
import Rub from '../../Icons/Rub';

type TripDetailsPriceInfoProps = {
	amountPrice: number;
};

const cnTripDetails = cn('TripDetails');

const TripDetailsPriceInfo: FC<TripDetailsPriceInfoProps> = ({ amountPrice }) => (
	<div className={cnTripDetails('PriceInfo')}>
		<span className={cnTripDetails('PriceTitle', ['Bold'])}>Итог</span>
		<span className={cnTripDetails('AmountPrice', ['Bold'])}>
			{numberWithSpaces(Math.ceil(amountPrice))} <Rub fontSize='large' />
		</span>
	</div>
);

export default TripDetailsPriceInfo;
