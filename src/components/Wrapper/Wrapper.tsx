import { FC, PropsWithChildren } from 'react';
import { cn } from '@bem-react/classname';

import './Wrapper.scss';
import { IClassNameProps } from '@bem-react/core';

const cnWrapper = cn('Wrapper');

type WrapperProps = {
	type?: 'flex' | 'flexCenter' | 'page' | 'relative';
} & PropsWithChildren &
	IClassNameProps;

const Wrapper: FC<WrapperProps> = ({ children, className, type }) => (
	<div className={cnWrapper({ type }, [className])}>{children}</div>
);

export default Wrapper;
