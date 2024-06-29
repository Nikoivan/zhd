import { FC } from 'react';

import { PlaceListItemProps } from '../../../redux/slices/formPlacesSlice/formPlacesSlice';
import { cn } from '@bem-react/classname';
import { Button } from '../../Button/Button';

type FormPlacesListProps = {
	options: PlaceListItemProps[];
	onSelect(option: PlaceListItemProps): void;
};

const cnForm = cn('Form');

const FormPlacesList: FC<FormPlacesListProps> = ({ options, onSelect }) => (
	<ul className={cnForm('PlacesList')}>
		{options.map((option, idx) => (
			<li
				className={cnForm('PlacesItem')}
				key={idx}>
				{
					<Button
						onClick={() => {
							onSelect(option);
						}}
						supraType='withoutAll'>
						{option.name}
					</Button>
				}
			</li>
		))}
	</ul>
);

export default FormPlacesList;
