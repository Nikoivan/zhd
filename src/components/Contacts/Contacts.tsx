import { FC } from 'react';

import * as data from '../../assets/contacts/contacts.json';
import ContactsList from './List/Contacts-List';

import './Contacts.scss';
import Subscription from '../Subscription/Subscription';
import Socials from '../Socials/Socials';

const { contactsList, socialNetworks } = data.contacts;

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
