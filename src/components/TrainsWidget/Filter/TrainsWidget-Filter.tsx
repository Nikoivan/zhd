import { cn } from '@bem-react/classname';
import { FC } from 'react';
import { Button } from '../../Button/Button';

const buttonsList = [5, 10, 20];

type TrainsWidgetFilterProps = {
	activeValue: number | null;
	onChange(valueName: string, value: string | number | boolean): void;
};

const cnTrainsWidget = cn('TrainsWidget');

const TrainsWidgetFilter: FC<TrainsWidgetFilterProps> = ({ activeValue, onChange }) => (
	<div className={cnTrainsWidget('Filter')}>
		показывать по:
		{buttonsList.map((item, idx) => (
			<Button
				className={cnTrainsWidget('ButtonCount', { type: item === (activeValue || 5) ? 'active' : undefined })}
				onClick={() => {
					const valueName = 'limit';

					onChange(valueName, item === 5 ? '' : item);
				}}
				key={idx}
				supraType='withoutAll'>
				{item}
			</Button>
		))}
	</div>
);

export default TrainsWidgetFilter;
