import { FC } from 'react';

type ContactsItemTypeMultilineProps = {
	values: string[];
};

const ContactsItemTypeMultiline: FC<ContactsItemTypeMultilineProps> = ({ values }) => (
	<div className='Contacts-MultilineWrap'>
		{values.map((item, idx) => (
			<div
				className='Contacts-ItemLine'
				key={idx}>
				<span className='Contacts-ItemContent'>{item}</span>
			</div>
		))}
	</div>
);

export default ContactsItemTypeMultiline;
