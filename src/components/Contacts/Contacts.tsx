import { FC } from 'react';

import contactsData from '../../assets/contacts/contacts';
import Subscription from '../Subscription/Subscription';
import ContactsList from './List/Contacts-List';
import Socials from '../Socials/Socials';

import './Contacts.scss';

const { contactsList, socialNetworks } = contactsData;

type ContactsProps = {
	className?: string | null;
};

const Contacts: FC<ContactsProps> = ({ className }) => (
	<div className={`Contacts${className ? ' Contacts' + className : ''}`}>
		<div className='Contacts-Wrapper'>
			<div className='Contacts-Column'>
				<h3 className='Contacts-ColumnTitle'>Свяжитесь с нами</h3>
				<ContactsList contacts={contactsList} />
			</div>
			<div className='Contacts-Column Contacts-Column_type_full'>
				<h3 className='Contacts-ColumnTitle'>Подписка</h3>
				<Subscription title='Будьте вкурсе событий' />
				<Socials
					title='Подписывайтесь на нас'
					data={socialNetworks}
				/>
			</div>
		</div>
	</div>
);

export default Contacts;
