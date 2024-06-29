import { ChangeEvent, FC, FormEvent, useRef, useState } from 'react';
import { Popover } from '@mui/material';
import { cn } from '@bem-react/classname';

import formValidation, { ValidationsTypes } from '../../../services/validators/formValidation.service';
import { Button } from '../../Button/Button';
import { Input } from '../../Input/Input';
import { getUrlSubscription } from '../../../services/utils/url.util';
import useClickOutside from '../../../hooks/useClickOutside';
import requestAPI from '../../../services/API/requestAPI';

export type Error = {
	status: boolean;
	message: null | string;
};

const cnSubscription = cn('Subscription');

const SubscriptionForm: FC = () => {
	const [value, setValue] = useState<string>('');
	const [anchorEl, setAnchorEl] = useState<Element | null>(null);
	const [message, setMessage] = useState<string | null>(null);
	const [hasError, setError] = useState<boolean>(false);

	const ref = useRef(null);

	useClickOutside(ref, () => {
		setMessage(null);
		setError(false);
	});

	const onClickHandler = async (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const { result, message } = formValidation(value, ValidationsTypes.EMAIL);

		if (!result) {
			setError(true);
			setMessage(message);

			return;
		}

		const url = getUrlSubscription(value);
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const response = await requestAPI({ url, options });
			if (!response) {
				setError(true);
				setMessage(response.statusText);

				return;
			}

			setMessage('Ваш Email успешно сохранен.');
			setValue('');
			setTimeout(() => {
				setMessage(null);
			}, 2000);
		} catch {
			setError(true);
			setMessage('Что-то пошло не так...');
		}
	};

	return (
		<form
			className={cnSubscription('Form')}
			ref={ref}
			onSubmit={(e: FormEvent) => {
				e.preventDefault();
			}}>
			<Popover
				className={cnSubscription('Popover')}
				open={hasError || !!message}
				anchorOrigin={{ vertical: 55, horizontal: -10 }}
				anchorEl={anchorEl}>
				<span className={cnSubscription('PopoverText', { type: hasError ? 'error' : undefined })}>{message}</span>
			</Popover>

			<Input
				className={cnSubscription('Input')}
				value={value}
				error={hasError}
				placeholder='email'
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					setValue(e.target.value);
					if (anchorEl) {
						return;
					}
					setAnchorEl(e.target);
				}}
			/>

			<Button
				className={cnSubscription('Button')}
				onClick={onClickHandler}>
				Отправить
			</Button>
		</form>
	);
};

export default SubscriptionForm;
