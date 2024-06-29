import { FC, useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { cn } from '@bem-react/classname';

import Avatar from '../Icons/Avatar';
import { getDocumentDataWithSpaces, numberWithSpaces } from '../../services/utils/strings.util';
import { useAppSelector } from '../../store/store';
import TrainsWidgetListItem from '../TrainsWidget/ListItem/TrainsWidget-ListItem';
import { Button } from '../Button/Button';
import Rub from '../Icons/Rub';

const error = 'Что-то пошло не так. Попробуйте позже';

import './ComfirmWidget.scss';
import { getUrlToSendOrder } from '../../services/utils/url.util';

const cnConfirmWidget = cn('ConfirmWidget');

const ConfirmWidget: FC = () => {
	const [errorText, setErrorText] = useState<string | null>(null);
	const { user, departure } = useAppSelector((state) => state.ticketData);

	const navigate = useNavigate();

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

	const fetchConfirm = useCallback(async () => {
		if (!user || !departure) {
			return;
		}

		if (errorText) {
			setErrorText(null);
		}

		try {
			const response = await fetch(getUrlToSendOrder(), {
				method: 'POST',
				body: JSON.stringify({
					user,
					departure,
				}),
			});

			if (response.status >= 300 || !response) {
				setErrorText(error);
			}

			const data = await response.json();

			if (data.status) {
				navigate('../success');
			}
		} catch {
			setErrorText(error);
		}
	}, [departure, errorText, navigate, user]);

	return (
		<div className={cnConfirmWidget()}>
			<div className={cnConfirmWidget('Container')}>
				<div className={cnConfirmWidget('TrainInfo')}>
					<div className={cnConfirmWidget('TrainInfoHead')}>
						<h2 className={cnConfirmWidget('Title')}>Поезд</h2>
					</div>
					<div className={cnConfirmWidget('TrainInfoContent')}>
						{!!departure?.direction && (
							<ul className={cnConfirmWidget('TrainList', ['List'])}>
								<TrainsWidgetListItem
									{...departure?.direction}
									returnToList
								/>
							</ul>
						)}
					</div>
				</div>
				<div className={cnConfirmWidget('PassInfo')}>
					<div className={cnConfirmWidget('PassInfoHead')}>
						<h2 className={cnConfirmWidget('Title')}>Пассажиры</h2>
					</div>
					<div className={cnConfirmWidget('PassInfoContent')}>
						{!!departure?.seats.length && (
							<ul className={cnConfirmWidget('PassInfoList', ['List'])}>
								{departure?.seats.map((item, idx) => (
									<li
										className={cnConfirmWidget('PassInfoItem')}
										key={idx}>
										<div className={cnConfirmWidget('PassItemHead')}>
											<Avatar fontSize='inherit' />
											<span className={cnConfirmWidget('PassType')}>{item.is_child ? 'Детский' : 'Взрослый'}</span>
										</div>
										<div className={cnConfirmWidget('PassItemContent')}>
											<p className={cnConfirmWidget('FullName')}>
												{`${item.person_info.last_name} ${item.person_info.first_name} ${item.person_info.patronymic}`}
											</p>
											<p className={cnConfirmWidget('Row', { type: 'first' })}>
												Пол {item.person_info.gender ? 'мужской' : 'женский'}
											</p>
											<p className={cnConfirmWidget('Row')}>Дата рождения {item.person_info.birthday}</p>
											<p className={cnConfirmWidget('Row')}>
												{item.person_info.document_type === 'certificate' ? 'Паспорт РФ' : 'Свидетельство о рождении'}{' '}
												{getDocumentDataWithSpaces(item.person_info.document_type, item.person_info.document_data)}
											</p>
										</div>
									</li>
								))}
							</ul>
						)}
						<div className={cnConfirmWidget('PassInfoPrice')}>
							<div className={cnConfirmWidget('SubPriceInfo')}>
								Всего
								<span className={cnConfirmWidget('TotalPrice')}>
									{numberWithSpaces(
										(seatsCounts.adults ? seatsCounts.adults.price : 0) + (seatsCounts.children ? seatsCounts.children?.price : 0)
									)}
								</span>
								<Rub />
							</div>
							<Button
								className={cnConfirmWidget('Btn', { type: 'passengers' })}
								onClick={() => {
									navigate('../passengers');
								}}>
								Изменить
							</Button>
						</div>
					</div>
				</div>
				<div className={cnConfirmWidget('PayInfo')}>
					<div className={cnConfirmWidget('PayInfoHead')}>
						<h2 className={cnConfirmWidget('Title')}>Способ оплаты</h2>
					</div>
					<div className={cnConfirmWidget('PayInfoContent')}>
						<div className={cnConfirmWidget('PayInfoType')}>{user.payment_method === 'cash' ? 'Наличными' : 'Онлайн'}</div>
						<div className={cnConfirmWidget('PayActions')}>
							<Button
								className={cnConfirmWidget('Btn')}
								onClick={() => {
									navigate('../payment');
								}}>
								Изменить
							</Button>
						</div>
					</div>
				</div>
				<div className={cnConfirmWidget('Actions')}>
					<Button
						className={cnConfirmWidget('ActionBtn')}
						onClick={fetchConfirm}>
						Подтвердить
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmWidget;
