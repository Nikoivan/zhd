import { FC } from 'react';
import { useLocation } from 'react-router';
import { cn } from '@bem-react/classname';

import Nav from '../Nav/Nav';
import StepsBar from '../StepsBar/StepsBar';
import HeaderWidget from './Widget/Header-Widget';

import './Header.scss';
import '../Title/Title.scss';

const cnHeader = cn('Header');
const cnTitle = cn('Title');

const Header: FC = () => {
	const location = useLocation();
	const isMainPage = location.pathname === '/';
	const isSuccess = location.pathname === '/success';

	return (
		<header className={cnHeader({ type: isMainPage ? 'main' : isSuccess ? 'success' : undefined })}>
			<Nav />
			<div className={cnHeader('Wrapper', { type: isMainPage ? 'main' : isSuccess ? 'success' : undefined })}>
				{isMainPage && (
					<h1 className={cnHeader('Title', [cnTitle()])}>
						Вся жизнь - <span className={cnTitle({ type: 'bold' })}>путешествие!</span>
					</h1>
				)}
				{isSuccess && <h1 className={cnHeader('Title', { type: 'success' })}>Благодарим Вас за заказ!</h1>}
				{!isSuccess && <HeaderWidget isMainPage={isMainPage} />}
			</div>
			{!isMainPage && !isSuccess && <StepsBar />}
		</header>
	);
};

export default Header;
