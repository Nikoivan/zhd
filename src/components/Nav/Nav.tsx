import { NavLink } from 'react-router-dom';

import Logo from '../Logo/Logo';

import './Nav.scss';
import { FC } from 'react';
import { cn } from '@bem-react/classname';

const navItems = [
	{
		title: 'О нас',
		to: '#aboutUs',
	},
	{
		title: 'Как это работает',
		to: '#howItWorks',
	},
	{
		title: 'Отзывы',
		to: '#feedbacks',
	},
	{
		title: 'Контакты',
		to: '#contacts',
	},
];

const cnNav = cn('Nav');

const Nav: FC = () => (
	<nav className={cnNav()}>
		<Logo />
		<ul className={cnNav('List')}>
			{navItems.map((item, id) => (
				<li
					className={cnNav('Item')}
					key={id}>
					<NavLink
						className={cnNav('Link')}
						key={id}
						to={window.location.origin + item.to}>
						{item.title}
					</NavLink>
				</li>
			))}
		</ul>
	</nav>
);

export default Nav;
