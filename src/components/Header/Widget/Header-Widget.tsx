import { FC } from 'react';

import Form from '../../Form/Form';

import './Header-Widget.scss';
import { cn } from '@bem-react/classname';

export type PropsWithMainPageArg = {
	isMainPage: boolean;
};

const cnHeader = cn('Header');

const HeaderWidget: FC<PropsWithMainPageArg> = ({ isMainPage }) => (
	<div className={cnHeader('Widget', { type: isMainPage ? 'main' : undefined })}>
		<Form isMainPage={isMainPage} />
	</div>
);

export default HeaderWidget;
