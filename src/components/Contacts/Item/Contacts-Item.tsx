import { FC } from 'react';

import ContactsItemTypeMultiline from '../type/Contacts-Item_type_multiline';

import './Contacts-Item.scss';

export type ContactsItemProps = {
	title: string;
	value: string | string[];
	icon: string;
	url?: string;
};

const ContactsItem: FC<ContactsItemProps> = ({ title, value, icon, url }) => (
	<a
		className={`Contacts-Item${Array.isArray(value) ? ' Contacts-Item_type_multiline' : ''}`}
		href={url || `${title}:${value}`}>
		<img
			src={icon}
			alt={title}
			className='Contacts-ItemIcon'
		/>
		{Array.isArray(value) ? (
			<ContactsItemTypeMultiline values={value} />
		) : (
			<span className='Contacts-ItemContent'>{value}</span>
		)}
	</a>
);

export default ContactsItem;
