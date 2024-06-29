import { FC, useState } from 'react';
import { cn } from '@bem-react/classname';
import { Switch } from '@mui/material';

import { NameType } from '../Options-List/TicketsWidget-OptionsList';

export type TicketsWidgetListItemProps = {
	title: string;
	url: string;
	name: NameType;
	checked: boolean;
	onChange(name: string, value: boolean): void;
};

const cnTicketWidgets = cn('TicketsWidget');

const TicketsWidgetListItem: FC<TicketsWidgetListItemProps> = ({ title, url, name, checked, onChange }) => {
	const [isChecked, setChecked] = useState<boolean>(checked);

	return (
		<li className={cnTicketWidgets('ListItem')}>
			<img
				src={url}
				alt={title}
				className={cnTicketWidgets('ItemIcon')}
			/>
			<span className={cnTicketWidgets('OptionTitle')}>{title}</span>
			<Switch
				className={cnTicketWidgets('Switch')}
				checked={isChecked}
				size='medium'
				onChange={() => {
					onChange(name, !isChecked);
					setChecked(!isChecked);
				}}
				inputProps={{ 'aria-label': 'controlled' }}
			/>
		</li>
	);
};

export default TicketsWidgetListItem;
