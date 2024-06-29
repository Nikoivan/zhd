import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';
import { cn } from '@bem-react/classname';
import { IconButton, OutlinedInput } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { ticketDataActions } from '../../redux/slices/ticketSlice/ticketSlice';
import { isKeyofUserData } from '../../services/typeGuards/typeGuasrds';
import { Button } from '../Button/Button';
import CheckboxEmpty from '../Icons/CheckboxEmpty';
import CheckboxChecked from '../Icons/CheckboxChecked';

import './PaymentWidget.scss';
import isValidFieldValue from '../../services/validators/paymentWidgetValidator';
import { useNavigate } from 'react-router';

type PaymentWidgetErrors = {
	first_name: boolean;
	last_name: boolean;
	patronymic: boolean;
	phone: boolean;
	email: boolean;
	payment_method: boolean;
};

const initErrors = {
	first_name: false,
	last_name: false,
	patronymic: false,
	phone: false,
	email: false,
	payment_method: false,
};

const cnPaymentWidget = cn('PaymentWidget');

const PaymentWidget: FC = () => {
	const [errors, setErrors] = useState<PaymentWidgetErrors>(initErrors);
	const { user } = useAppSelector((state) => state.ticketData);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const validated = useMemo(() => {
		return (
			Object.values(user).every((item) => item !== '' && item !== null) && Object.values(errors).every((item) => !item)
		);
	}, [errors, user]);

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target;

			if (!isKeyofUserData(name)) {
				return;
			}

			if (!isValidFieldValue(name, value) && value !== '') {
				setErrors((prev) => ({ ...prev, [name]: true }));
			} else if (errors[name]) {
				setErrors((prev) => ({ ...prev, [name]: false }));
			}

			dispatch(ticketDataActions.setUserValue({ name, value: value }));
		},
		[dispatch, errors]
	);

	return (
		<div className={cnPaymentWidget()}>
			<div className={cnPaymentWidget('Container')}>
				<div className={cnPaymentWidget('Item')}>
					<div className={cnPaymentWidget('ItemHeader')}>
						<h2 className={cnPaymentWidget('Title', ['H2'])}>Персональные данные</h2>
					</div>
					<div className={cnPaymentWidget('ItemMain')}>
						<div className={cnPaymentWidget('PersonNames')}>
							<div className={cnPaymentWidget('PersonInfo')}>
								Фамилия
								<OutlinedInput
									className={cnPaymentWidget('PersonName')}
									name='last_name'
									value={user.last_name}
									onChange={handleChange}
									error={errors.last_name}
								/>
							</div>
							<div className={cnPaymentWidget('PersonInfo')}>
								Имя
								<OutlinedInput
									className={cnPaymentWidget('PersonName')}
									name='first_name'
									value={user.first_name}
									onChange={handleChange}
									error={errors.first_name}
								/>
							</div>
							<div className={cnPaymentWidget('PersonInfo')}>
								Отчество
								<OutlinedInput
									className={cnPaymentWidget('PersonName')}
									name='patronymic'
									value={user.patronymic}
									onChange={handleChange}
									error={errors.patronymic}
								/>
							</div>
						</div>
						<div className={cnPaymentWidget('Contacts')}>
							<div className={cnPaymentWidget('PhoneWrap')}>
								Контактный телефон
								<OutlinedInput
									className={cnPaymentWidget('ContactItem')}
									name='phone'
									value={user.phone}
									onChange={handleChange}
									error={errors.phone}
								/>
							</div>
							<div className={cnPaymentWidget('EmailWrap')}>
								E-mail
								<OutlinedInput
									className={cnPaymentWidget('ContactItem')}
									name='email'
									value={user.email}
									onChange={handleChange}
									error={errors.email}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className={cnPaymentWidget('Item')}>
					<div className={cnPaymentWidget('ItemHeader')}>
						<h2 className={cnPaymentWidget('Title', ['H2'])}>Способ оплаты</h2>
					</div>
					<div className={cnPaymentWidget('ItemMain', { type: 'pay' })}>
						<div className={cnPaymentWidget('PayItem')}>
							<div className={cnPaymentWidget('PayControl')}>
								<IconButton
									className={cnPaymentWidget('FormControl')}
									onClick={() => {
										dispatch(ticketDataActions.setUserPayMethod({ value: 'cashless' }));
									}}>
									{user.payment_method === 'cashless' ? <CheckboxChecked /> : <CheckboxEmpty />}
								</IconButton>
								<span className={cnPaymentWidget('Label')}>Онлайн</span>
							</div>
							<div className={cnPaymentWidget('PayList')}>
								<span className={cnPaymentWidget('PayListItem')}>Банковской картой</span>
								<span className={cnPaymentWidget('PayListItem')}>PayPal</span>
								<span className={cnPaymentWidget('PayListItem')}>Visa QIWI Wallet</span>
							</div>
						</div>
						<div className={cnPaymentWidget('PayItem', { type: 'last' })}>
							<div className={cnPaymentWidget('PayControl')}>
								<IconButton
									className={cnPaymentWidget('FormControl')}
									onClick={() => {
										dispatch(ticketDataActions.setUserPayMethod({ value: 'cash' }));
									}}>
									{user.payment_method === 'cash' ? <CheckboxChecked /> : <CheckboxEmpty />}
								</IconButton>
								<span className={cnPaymentWidget('Label')}>Наличными</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={cnPaymentWidget('Actions')}>
				<Button
					className={cnPaymentWidget('ActionBtn')}
					disabled={!validated}
					onClick={() => {
						navigate('../confirm');
					}}>
					Купить билеты
				</Button>
			</div>
		</div>
	);
};

export default PaymentWidget;
