import { FC, useMemo, useState } from 'react';
import { cn } from '@bem-react/classname';
import { IconButton } from '@mui/material';

import FourthClass from '../../Icons/FourthClass';
import ThirdClass from '../../Icons/ThirdClass';
import SecondClass from '../../Icons/SecondClass';
import FirstClass from '../../Icons/FirstClass';
import { SeatsWidgetItemProps } from '../../SeatsWidget/SeatsWidget';

import TrainInfoVansInfo from '../VansInfo/TrainInfo-VansInfo';
import { getDataTypesWithoutError } from '../../../services/helpers/van.utils';
import { OnPlaceClickData } from '../TrainInfo';

export type ClassTypes = 'fourth' | 'third' | 'second' | 'first';

const classes = {
	fourth: { Icon: FourthClass, text: 'Сидячий' },
	third: { Icon: ThirdClass, text: 'Плацкарт' },
	second: { Icon: SecondClass, text: 'Купе' },
	first: { Icon: FirstClass, text: 'Люкс' },
};

const cnTrainInfo = cn('TrainInfo');

const TrainInfoVanTypeList: FC<{
	data: SeatsWidgetItemProps[];
	directionId: string;
	onPlaceClick: (data: OnPlaceClickData) => void;
}> = ({ data, directionId, onPlaceClick }) => {
	const [activeClass, setActive] = useState<ClassTypes | null>(null);
	const activeItems = useMemo(() => {
		return data.filter(({ coach: { class_type } }) => class_type === activeClass);
	}, [activeClass, data]);

	const newData = useMemo(() => getDataTypesWithoutError(data), [data]);

	return (
		<>
			<ul className={cnTrainInfo('VanTypeList', ['List'])}>
				{newData.map(({ coach: { class_type } }, idx) => {
					const Icon = classes[class_type].Icon;

					return (
						<li
							key={idx}
							className={cnTrainInfo('VanTypeItem', { active: activeClass === class_type })}>
							<IconButton
								className={cnTrainInfo('TypeIcon')}
								onClick={() => {
									setActive(class_type);
								}}>
								<Icon
									fontSize='inherit'
									active={activeClass === class_type}
								/>
							</IconButton>
							<span className={cnTrainInfo('TypeText')}>{classes[class_type].text}</span>
						</li>
					);
				})}
			</ul>
			{!!activeClass && !!activeItems && (
				<>
					<TrainInfoVansInfo
						data={activeItems}
						directionId={directionId}
						onPlaceClick={onPlaceClick}
					/>
				</>
			)}
		</>
	);
};

export default TrainInfoVanTypeList;
