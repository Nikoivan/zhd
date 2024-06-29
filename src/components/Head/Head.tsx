import { FC } from 'react';
import { cn } from '@bem-react/classname';
import { IconButton } from '@mui/material';

import Wrapper from '../Wrapper/Wrapper';
import ItemTitle from '../ItemTitle/ItemTitle';

import iconPlusUrl from '../../assets/icons/plus-in-square.svg';
import iconMinusUrl from '../../assets/icons/minus-in-square.svg';
import iconToUrl from '../../assets/icons/arrow-right.svg';
import iconReturnUrl from '../../assets/icons/arrow-left.svg';
import { PlaceTypes } from '../../redux/slices/ticketSlice/ticketsSliceTypes';

import './Head.scss';

const getIconUrl = (type: PlaceTypes): string => {
	return type === 'departure' ? iconToUrl : iconReturnUrl;
};

type HeadProps = {
	type: PlaceTypes;
	isOpen: boolean;
	title: string;
	date?: string;
	onClick(): void;
};

const cnHead = cn('Head');

const Head: FC<HeadProps> = ({ type, isOpen, title, date, onClick }) => (
	<Wrapper className={cnHead('HeaderWrap')}>
		<img
			src={getIconUrl(type)}
			alt='arrow-direction'
		/>
		<ItemTitle
			className={cnHead('DirectionTitle')}
			size='xl'
			type='bold'>
			{title}
		</ItemTitle>
		{!!date && <span className={cnHead('Date')}>{date}</span>}
		<IconButton onClick={onClick}>
			<img
				src={isOpen ? iconMinusUrl : iconPlusUrl}
				alt='свернуть/развернуть'
			/>
		</IconButton>
	</Wrapper>
);

export default Head;
