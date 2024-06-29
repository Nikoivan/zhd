import { FC, PropsWithChildren } from 'react';
import { cn } from '@bem-react/classname';

import './ItemTitle.scss';
import { IClassNameProps } from '@bem-react/core';

export type ItemTitleProps = {
	size?: 's' | 'm' | 'l' | 'xl' | 'xxl';
	type?: 'bold';
} & PropsWithChildren &
	IClassNameProps;

const cnItemTitle = cn('ItemTitle');

const ItemTitle: FC<ItemTitleProps> = ({ size, type, children, className }) => (
	<span className={cnItemTitle({ size, type }, [className])}>{children}</span>
);

export default ItemTitle;
