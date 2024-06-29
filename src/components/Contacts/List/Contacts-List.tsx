import { FC } from 'react';
import ContactsItem, { ContactsItemProps } from '../Item/Contacts-Item';

import './Contacts-List.scss';

export type ContactsListProps = {
	contacts: ContactsItemProps[];
};

const ContactsList: FC<ContactsListProps> = ({ contacts }) => (
	<ul className='Contacts-List'>
		{contacts.map((item, idx) => (
			<ContactsItem
				{...item}
				key={idx}
			/>
		))}
	</ul>
);

export default ContactsList;
