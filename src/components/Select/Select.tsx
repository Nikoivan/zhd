import { FC, useCallback, useMemo, useRef, useState } from 'react';
import { IClassNameProps } from '@bem-react/core';
import { cn } from '@bem-react/classname';

import { Button } from '../Button/Button';
import SelectOption from './Option/Select-Option';

import './Select.scss';
import useClickOutside from '../../hooks/useClickOutside';

export type OptionProps = {
	title: string;
	value: string;
};

type SelectProps = {
	options: OptionProps[];
	activeValue?: string;
	listClassName?: string;
	itemClassName?: string;

	onSelect(value?: string): void;
} & IClassNameProps;

const cnSelect = cn('Select');

const Select: FC<SelectProps> = ({ options, activeValue, onSelect, listClassName, itemClassName, className }) => {
	const [isOpen, setOpen] = useState<boolean>(false);
	const ref = useRef(null);
	useClickOutside(ref, () => {
		setOpen(false);
	});

	const onClick = useCallback(() => {
		if (isOpen) {
			return;
		}
		setOpen(true);
	}, [isOpen]);

	const activeTitle = useMemo(() => {
		return options.find((option) => option.value === activeValue)?.title;
	}, [options, activeValue]);

	return (
		<div className={cnSelect(null, [className])}>
			{!!activeTitle && (
				<Button
					className={cnSelect('Button')}
					supraType='withoutAll'
					onClick={onClick}>
					{activeTitle}
				</Button>
			)}
			{isOpen && (
				<ul
					className={cnSelect('List', [listClassName])}
					ref={ref}>
					{options.map((el, idx) => (
						<SelectOption
							className={itemClassName}
							key={idx}
							{...el}
							selected={el.value === activeValue}
							onClick={(value: string) => {
								onSelect(value);
								setOpen(false);
							}}
						/>
					))}
				</ul>
			)}
		</div>
	);
};

export default Select;
