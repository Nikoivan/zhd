import { cn } from '@bem-react/classname';
import { FC } from 'react';
import { IClassNameProps } from '@bem-react/core';

import WiFi from '../Icons/WiFi';
import Express from '../Icons/Express';
import Coffee from '../Icons/Coffee';

import './OptionsIndicator.scss';

type TrainsWidgetOptionsIndicatorProps = IClassNameProps & {
	haveWifi: boolean;
	isExpress: boolean;
	haveAirContitioning: boolean;
};

const cnOptionsIndicator = cn('OptionsIndicator');

const OptionsIndicator: FC<TrainsWidgetOptionsIndicatorProps> = ({
	className,
	haveWifi,
	isExpress,
	haveAirContitioning,
}) => (
	<div className={cnOptionsIndicator(null, [className])}>
		{haveWifi && (
			<WiFi
				className={cnOptionsIndicator('Icon')}
				fontSize='small'
			/>
		)}
		{isExpress && (
			<Express
				className={cnOptionsIndicator('Icon')}
				fontSize='small'
			/>
		)}
		{haveAirContitioning && (
			<Coffee
				className={cnOptionsIndicator('Icon')}
				fontSize='small'
			/>
		)}
	</div>
);

export default OptionsIndicator;
