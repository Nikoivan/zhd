import { FC } from 'react';
import { Input, InputProps } from '@mui/material';
import { cn } from '@bem-react/classname';

import './Input.scss';

const cnInput = cn('Input');

const InputElement: FC<InputProps & { error?: boolean }> = ({ onChange, className, error, ...props }) => (
	<Input
		className={cnInput(null, [className])}
		onChange={onChange}
		error={error}
		{...props}
	/>
);

export { InputElement as Input };
