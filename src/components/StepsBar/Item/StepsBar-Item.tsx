import { FC } from 'react';
import { cn } from '@bem-react/classname';

import './StepsBar-Item.scss';

export type StepsBarItemProps = {
	count: number;
	title: string;
	isActive: boolean;
	idx: number;
	withoutArrow?: boolean;
};

const cnStepsBar = cn('StepsBar');

const StepsBarItem: FC<StepsBarItemProps> = ({ count, title, isActive, idx, withoutArrow }) => (
	<>
		{isActive && <span className={cnStepsBar('ActiveBack')}></span>}
		<li
			className={cnStepsBar('Item', {
				type: isActive ? 'active' : undefined,
				first: idx === 0,
				second: idx === 1,
				third: idx === 2,
				last: idx === 3,
			})}>
			{isActive && <span className={cnStepsBar('ActiveBack')}></span>}
			<span className={cnStepsBar('Count')}>{count}</span>
			<span className={cnStepsBar('ItemTitle')}>{title}</span>
		</li>

		{!withoutArrow && <span className={cnStepsBar('Arrow', { type: isActive ? 'active' : undefined })}></span>}
	</>
);

export default StepsBarItem;
