import { FC, PropsWithChildren } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { cn } from '@bem-react/classname';

import './Button.scss';

type ButtonTypes = 'withoutAll' | 'action' | 'standart';

type ButtonPropsLocal = PropsWithChildren &
	ButtonProps & {
		supraType?: ButtonTypes;
		className?: string;
	};

const cnButton = cn('Button');

const ButtonElement: FC<ButtonPropsLocal> = ({ className, children, supraType: type, ...props }) => (
	<Button
		className={cnButton({ type }, [className])}
		{...props}>
		{children}
	</Button>
);

export { ButtonElement as Button };
