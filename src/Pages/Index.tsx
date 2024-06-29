import { FC, useEffect } from 'react';
import { cn } from '@bem-react/classname';

import Wrapper from '../components/Wrapper/Wrapper';
import { Button } from '../components/Button/Button';

import monitorUrl from '../assets/icons/monitor.svg';
import blocksUrl from '../assets/icons/blocks.svg';
import globalUrl from '../assets/icons/global.svg';
import FeedBacks from '../components/FeedBacks/FeedBacks';
import { useLocation } from 'react-router';

const howItWorksData = [
	{
		title: 'Удобный заказ на сайте',
		url: monitorUrl,
	},
	{
		title: 'Нет необходимости ехать в офис',
		url: blocksUrl,
	},
	{
		title: 'Огромный выбор направлений',
		url: globalUrl,
	},
];

const cnAboutUs = cn('AboutUs');
const cnHowItWorks = cn('HowItWorks');

const Index: FC = () => {
	const { hash } = useLocation();

	useEffect(() => {
		if (!hash) {
			return;
		}

		document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
	}, [hash]);

	return (
		<div>
			<div
				className={cnAboutUs()}
				id='aboutUs'>
				<h2 className={cnAboutUs('Title')}>О нас</h2>
				<div className={cnAboutUs('Content')}>
					<p className={cnAboutUs('Paragraph')}>
						Мы рады видеть вас! Мы работаем для Вас с 2003 года. 14 лет мы наблюдаем, как с каждым днем все больше людей
						заказывают жд билеты через интернет.
					</p>
					<p className={cnAboutUs('Paragraph')}>
						Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика, но стоит ли это делать? Мы расскажем о
						преимуществах заказа через интернет.
					</p>
					<p className={cnAboutUs('Paragraph', { type: 'bold' })}>
						Покупать жд билеты дешево можно за 90 суток до отправления поезда.
						<br /> Благодаря динамическому ценообразованию цена на билеты в это время самая низкая.
					</p>
				</div>
			</div>
			<div
				className={cnHowItWorks()}
				id='howItWorks'>
				<Wrapper type='flex'>
					<h3 className={cnHowItWorks('Title')}>Как это работает</h3>
					<Button>Узнать больше</Button>
				</Wrapper>
				<ul className={cnHowItWorks('List')}>
					{howItWorksData.map(({ title, url }, idx) => (
						<li
							className={cnHowItWorks('Item')}
							key={idx}>
							<div>
								<img
									src={url}
									alt={title}
									className={cnHowItWorks('Image')}
								/>
							</div>
							<div className={cnHowItWorks('ItemTitleWrap')}>
								<span className={cnHowItWorks('ItemTitle')}>{title}</span>
							</div>
						</li>
					))}
				</ul>
			</div>
			<FeedBacks />
		</div>
	);
};

export default Index;
