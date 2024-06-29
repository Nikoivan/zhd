import { FC, useCallback, useState } from 'react';
import { cn } from '@bem-react/classname';
import { IconButton } from '@mui/material';

import StarOutlined from '../Icons/StarOutlined';
import StarFilled from '../Icons/StarFilled';

import './Rating.scss';

const cnRating = cn('Rating');

type RatingProps = {
	title?: string;
	handleAction?: (rating: number) => void;
};

const ratingArray = [1, 2, 3, 4, 5];

const Rating: FC<RatingProps> = ({ title, handleAction }) => {
	const [rating, setRating] = useState<number | null>(null);

	const onClick = useCallback(
		(rating: number) => {
			setRating(rating);

			if (handleAction) {
				handleAction(rating);
			}
		},
		[handleAction]
	);

	return (
		<div className={cnRating()}>
			<div className={cnRating('Title')}>{title || 'Оценить сервис'}</div>
			<ul className={cnRating('List')}>
				{ratingArray.map((item, idx) => (
					<li
						className={cnRating('Item')}
						key={idx}>
						<IconButton
							className={cnRating('IconBtn')}
							onClick={() => {
								onClick(item);
							}}>
							{!!rating && rating >= item ? <StarFilled fontSize='inherit' /> : <StarOutlined fontSize='inherit' />}
						</IconButton>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Rating;
