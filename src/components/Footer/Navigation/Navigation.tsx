import { FC } from 'react';
import { IconButton } from '@mui/material';

import Logo from '../../Logo/Logo';
import Development from '../../Development/Development';

import './Navigation.scss';

type NavigationProps = {
	onClick(): void;
	hidden: boolean;
};

const Navigation: FC<NavigationProps> = ({ onClick, hidden }) => (
	<div className='Navigation'>
		<Logo />
		<IconButton
			className={`Navigation-HideButton${hidden ? ' Navigation-HideButton_type_hidden' : ''}`}
			onClick={onClick}>
			<img src='./zhd/src/assets/icons/vector.svg' />
		</IconButton>
		<Development />
	</div>
);

export default Navigation;
