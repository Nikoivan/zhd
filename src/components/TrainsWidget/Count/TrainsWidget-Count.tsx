import { FC } from 'react';
import { cn } from '@bem-react/classname';

type TrainsWidgetFilterProps = {
	foundCount: number;
};

const cnTrainsWidget = cn('TrainsWidget');

const TrainsWidgetCount: FC<TrainsWidgetFilterProps> = ({ foundCount }) => (
	<div className={cnTrainsWidget('Count')}>
		<span className={cnTrainsWidget('FoundCount')}>найдено {foundCount}</span>
	</div>
);

export default TrainsWidgetCount;
