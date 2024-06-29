import { FC, ReactNode } from 'react';
import { cn } from '@bem-react/classname';

import { Button } from '../Button/Button';

import './ErrorHadler.scss';

type ErrorHandlerProps = {
	onClick(): void;
	errorMessage?: ReactNode;
};

const cnErrorHandler = cn('ErrorHandler');

const ErrorHandler: FC<ErrorHandlerProps> = ({ onClick, errorMessage }) => (
	<div className={cnErrorHandler()}>
		{errorMessage || <span>Что-то пошло не так...</span>}
		<Button
			className={cnErrorHandler('Button')}
			onClick={onClick}>
			Попробовать вновь
		</Button>
	</div>
);

export default ErrorHandler;
