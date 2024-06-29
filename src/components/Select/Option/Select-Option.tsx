import { FC, memo } from 'react';
import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';

import { Button } from '../../Button/Button';

export type SelectOptionProps = {
	title: string;
	value: string;
	selected?: boolean;
	onClick(value: string): void;
} & IClassNameProps;

const cnSelect = cn('Select');

const Option: FC<SelectOptionProps> = ({ title, value, selected, className, onClick }) => (
	<li className={cnSelect('Option', { type: selected })}>
		<Button
			className={className}
			onClick={() => {
				onClick(value);
			}}
			supraType='withoutAll'>
			{title}
		</Button>
	</li>
);

const SelectOption = memo(Option);

export default SelectOption;
