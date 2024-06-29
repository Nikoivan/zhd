import { FC } from 'react';
import { cn } from '@bem-react/classname';

import { useAppSelector } from '../../store/store';
import Rub from '../Icons/Rub';

import './SuccessWidget.scss';
import SendToEmail from '../Icons/SendToEmail';
import PrintTickets from '../Icons/PrintTickets';
import Inspector from '../Icons/Inspector';
import Rating from '../Rating/Rating';
import { Link } from 'react-router-dom';
import { numberWithSpaces } from '../../services/utils/strings.util';

const cnSuccessWidget = cn('SuccessWidget');

const SuccessWidget: FC = () => {
	const { user, departure } = useAppSelector((state) => state.ticketData);

	const adults = departure?.seats.filter((item) => item.person_info.is_adult).map((item) => item.price);
	const children = departure?.seats
		.filter((item) => item.is_child && !item.include_children_seat)
		.map((item) => item.price);

	const seatsCounts = {
		adults:
			adults && adults.length ? { count: adults.length, price: adults.reduce((acc, item) => acc + item, 0) } : undefined,
		children:
			children && children.length
				? { count: children.length, price: children.reduce((acc, item) => acc + item, 0) }
				: undefined,
	};

	return (
		<div className={cnSuccessWidget()}>
			<div className={cnSuccessWidget('Wrap')}>
				<div className={cnSuccessWidget('Header')}>
					<div className={cnSuccessWidget('OrderNumberInfo')}>
						<h2 className={cnSuccessWidget('OrderInfoTitle')}>№Заказа {Math.ceil(Math.random() * 1000)}АА</h2>
					</div>
					<div className={cnSuccessWidget('OrderPriceInfo')}>
						сумма{' '}
						<span className={cnSuccessWidget('Price')}>
							{numberWithSpaces(
								(seatsCounts.adults ? seatsCounts.adults.price : 0) + (seatsCounts.children ? seatsCounts.children?.price : 0)
							)}
						</span>{' '}
						<Rub />
					</div>
				</div>
				<div className={cnSuccessWidget('Main')}>
					<div className={cnSuccessWidget('BoardInfo')}>
						<ul className={cnSuccessWidget('BoardList', ['List'])}>
							<li className={cnSuccessWidget('BoardItem')}>
								<SendToEmail fontSize='inherit' />
								<p className={cnSuccessWidget('BoardItemText')}>
									билеты будут отправлены на ваш <span className={cnSuccessWidget('BoldText')}>e-mail</span>
								</p>
							</li>
							<li className={cnSuccessWidget('BoardItem')}>
								<PrintTickets fontSize='inherit' />
								<p className={cnSuccessWidget('BoardItemText')}>
									<span className={cnSuccessWidget('BoldText')}>распечатайте</span> и сохраняйте билеты до даты поездки
								</p>
							</li>
							<li className={cnSuccessWidget('BoardItem')}>
								<Inspector fontSize='inherit' />
								<p className={cnSuccessWidget('BoardItemText')}>
									<span className={cnSuccessWidget('BoldText')}>предъявите</span> распечатанные билеты при посадке
								</p>
							</li>
						</ul>
					</div>
					<div className={cnSuccessWidget('CustomerInfo')}>
						<span className={cnSuccessWidget('CustomerName')}>
							{user?.first_name} {user?.patronymic}!
						</span>
						<p className={cnSuccessWidget('CustomerText')}>
							Ваш заказ успешно оформлен. <br />В ближайшее время с вами свяжется наш оператор для подтверждения.
						</p>
						<p className={cnSuccessWidget('CustomerText', { type: 'bold' })}>
							Благодарим Вас за оказанное доверие и желаем приятного путешествия!
						</p>
					</div>
				</div>
				<div className={cnSuccessWidget('Footer')}>
					<Rating />
					<div className={cnSuccessWidget('Actions')}>
						<Link
							className={cnSuccessWidget('ActionBtn')}
							to='/'>
							Вернуться на главную
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SuccessWidget;
